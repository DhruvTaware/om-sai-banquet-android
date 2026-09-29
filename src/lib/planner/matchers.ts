// ============================================================================
// RECOMMENDATION ENGINE — pure matching/scoring functions (Phase 3)
// ----------------------------------------------------------------------------
// Every function here is pure: (requirements, package) -> CriterionScore.
// No React, no I/O, no randomness — same inputs always produce the same
// output, which is what makes the overall engine deterministic and testable
// in isolation. `recommendationEngine.ts` composes these into the final
// weighted score; nothing here knows about weights.
// ============================================================================

import type { PlannerRequirements } from "@/types/planner";
import type { EventPackage, ServiceAvailability, StructuredMeal } from "@/data/packages/types";
import { RECOMMENDATION_CONFIG } from "./config";
import type { CriterionScore } from "./types";

const score = (score: number, note: string): CriterionScore => ({
  score: Math.max(0, Math.min(100, Math.round(score))),
  note,
});

// ----------------------------------------------------------------------------
// 1. EVENT TYPE
// ----------------------------------------------------------------------------

const EVENT_TYPE_ALIASES: Record<string, string[]> = {
  "Birthday / Anniversary": ["Birthday", "Anniversary"],
  "Religious / Cultural Events": ["Religious/Cultural Event"],
  Others: ["Other", "Family Function"],
};

export function eventTypeMatches(requirement: string, packageEventTypes: string[]): boolean {
  const acceptedTypes = EVENT_TYPE_ALIASES[requirement] ?? [requirement];
  return packageEventTypes.some((eventType) => acceptedTypes.includes(eventType));
}

export function matchEventType(req: PlannerRequirements, pkg: EventPackage): CriterionScore {
  if (req.eventType === "") {
    return score(100, "No event type specified.");
  }
  if (eventTypeMatches(req.eventType, pkg.eventTypes)) {
    return score(100, `Supports ${req.eventType} events.`);
  }
  return score(0, `Does not list ${req.eventType} as a supported event type.`);
}

// ----------------------------------------------------------------------------
// 2. VENUE
// ----------------------------------------------------------------------------

const VENUE_LABELS: Record<"banquet" | "lawns", EventPackage["venue"]> = {
  banquet: "OM SAI BANQUET HALL",
  lawns: "OM SAI LAWNS",
};

export function matchVenue(req: PlannerRequirements, pkg: EventPackage): CriterionScore {
  if (req.venue === "" || req.venue === "recommend") {
    return score(100, "Open to either venue — comparing on merit.");
  }
  const wanted = VENUE_LABELS[req.venue];
  if (pkg.venue === wanted) {
    return score(100, `${wanted === "OM SAI BANQUET HALL" ? "Banquet Hall" : "Lawns"} venue, as requested.`);
  }
  return score(0, `You selected ${wanted === "OM SAI BANQUET HALL" ? "Lawns" : "Banquet Hall"}, but this package is at the ${wanted === "OM SAI BANQUET HALL" ? "Banquet Hall" : "Lawns"}.`);
}

// ----------------------------------------------------------------------------
// 3. GUEST CAPACITY (±tolerance, closer-to-target scores higher)
// ----------------------------------------------------------------------------

export function matchCapacity(req: PlannerRequirements, pkg: EventPackage): CriterionScore {
  const guests = typeof req.guests === "number" ? req.guests : Number(req.guests);
  if (!guests || guests <= 0) {
    return score(100, "Guest count not specified.");
  }

  const tolFrac = RECOMMENDATION_CONFIG.capacityTolerancePercent / 100;
  const lower = guests * (1 - tolFrac);
  const upper = guests * (1 + tolFrac);
  const capacity = pkg.capacity;

  if (capacity >= lower && capacity <= upper) {
    const maxDist = guests * tolFrac || 1;
    const dist = Math.abs(capacity - guests);
    const frac = dist / maxDist;
    const s = 100 - frac * 25; // 75–100 across the whole tolerance band
    const label = frac < 0.15 ? "closely matches" : "comfortably fits";
    return score(s, `Capacity (${capacity.toLocaleString("en-IN")}) ${label} your ${guests.toLocaleString("en-IN")} guest requirement.`);
  }

  if (capacity < lower) {
    // Undersized: how far short of the tolerance band, relative to guest count.
    const shortfall = (lower - capacity) / guests;
    const s = 60 - shortfall * 150;
    return score(s, `Capacity (${capacity.toLocaleString("en-IN")}) is below your ${guests.toLocaleString("en-IN")} guest requirement.`);
  }

  // Oversized: usable, but not a snug fit — penalized more gently than being undersized.
  const excess = (capacity - upper) / guests;
  const s = 60 - excess * 40;
  return score(Math.max(5, s), `Capacity (${capacity.toLocaleString("en-IN")}) is larger than needed for ${guests.toLocaleString("en-IN")} guests.`);
}

// ----------------------------------------------------------------------------
// 4. BUDGET (flat tolerance above budget, mild penalty for being far under)
// ----------------------------------------------------------------------------

export function matchBudget(req: PlannerRequirements, pkg: EventPackage): CriterionScore {
  const budget = typeof req.budget === "number" ? req.budget : Number(req.budget);
  if (!budget || budget <= 0) {
    return score(100, "Budget not specified.");
  }

  const tolerance = req.budgetToleranceOverride ?? RECOMMENDATION_CONFIG.budgetTolerance;
  const price = pkg.price;

  if (price <= budget) {
    const under = (budget - price) / budget;
    const s = 100 - under * 40;
    const label = under < 0.05 ? "Excellent budget match." : "Within your budget range.";
    return score(s, label);
  }

  const upperLimit = budget + tolerance;
  if (price <= upperLimit) {
    const over = (price - budget) / tolerance;
    const s = 100 - over * 30;
    return score(s, `Slightly above budget (₹${price.toLocaleString("en-IN")}), within your ₹${tolerance.toLocaleString("en-IN")} tolerance.`);
  }

  const excess = (price - upperLimit) / budget;
  const s = 40 - excess * 80;
  return score(Math.max(0, s), `₹${price.toLocaleString("en-IN")} is well above your budget (₹${budget.toLocaleString("en-IN")} + tolerance).`);
}

// ----------------------------------------------------------------------------
// 5. TIMING (day / night / flexible)
// ----------------------------------------------------------------------------

const TIMING_KEYWORDS: Record<"day" | "night", string[]> = {
  day: ["day", "morning", "afternoon", "noon"],
  night: ["night", "evening"],
};

export function matchTiming(req: PlannerRequirements, pkg: EventPackage): CriterionScore {
  if (req.dayNight === "" || req.dayNight === "flexible") {
    return score(100, "Flexible on timing.");
  }

  let base: number;
  let note: string;
  if (pkg.timing.includes(req.dayNight)) {
    base = 100;
    note = `Supports ${req.dayNight} events, as requested.`;
  } else if (pkg.timing.includes("flexible")) {
    base = 80;
    note = "Flexible timing covers your preferred slot.";
  } else {
    base = 15;
    note = `Package timing does not cover your preferred ${req.dayNight} slot.`;
  }

  // Light, transparent nudge from the free-text "preferred timing" field —
  // deliberately simple keyword matching only (no NLP), and never enough on
  // its own to flip a mismatch into a match.
  const freeText = req.preferredTiming.toLowerCase();
  if (freeText) {
    const keywords = TIMING_KEYWORDS[req.dayNight];
    const mentioned = keywords.some((kw) => freeText.includes(kw));
    if (mentioned && base < 100) {
      base = Math.min(100, base + 5);
    }
  }

  return score(base, note);
}

// ----------------------------------------------------------------------------
// 6. DECORATION
// ----------------------------------------------------------------------------

function decorationOptionIncluded(pkg: EventPackage, option: string): boolean {
  const d = pkg.decoration;
  switch (option) {
    case "Haldi Setup":
      return d.haldiSetup.included;
    case "Vidhi Setup":
      return d.vidhiSetup.included;
    case "Main Stage Setup":
      return d.mainStageSetup.included;
    case "Varmala Setup":
      return d.varmalaSetup.included;
    case "Entry Setup":
      return d.entrySetup.included;
    case "Special Theme Decoration":
    case "Special/Theme Decoration":
      return d.themeTags.includes("Theme Decoration");
    case "Traditional Decoration":
      return d.themeTags.includes("Traditional Decoration");
    case "Modern Decoration":
      return d.themeTags.includes("Modern Decoration");
    default:
      return false;
  }
}

export function matchDecoration(req: PlannerRequirements, pkg: EventPackage): CriterionScore {
  if (req.decoration.length === 0) {
    return score(100, "No specific decoration requirements given.");
  }
  const matched = req.decoration.filter((opt) => decorationOptionIncluded(pkg, opt));
  const s = (matched.length / req.decoration.length) * 100;
  if (matched.length === req.decoration.length) {
    return score(s, `Includes all requested decoration: ${matched.join(", ")}.`);
  }
  if (matched.length > 0) {
    return score(s, `Includes ${matched.length} of ${req.decoration.length} requested decoration items (${matched.join(", ")}).`);
  }
  return score(0, "Does not include any of your requested decoration setups.");
}

// ----------------------------------------------------------------------------
// 7. CATERING
// ----------------------------------------------------------------------------

function structuredMealHasItems(meal: StructuredMeal): boolean {
  return (
    meal.breads.length > 0 ||
    meal.dryBhaji.length > 0 ||
    meal.wetBhaji.length > 0 ||
    meal.salad.length > 0 ||
    meal.rice.length > 0 ||
    meal.dal.length > 0 ||
    meal.sweet.length > 0 ||
    meal.dessert.length > 0
  );
}

function cateringOptionIncluded(pkg: EventPackage, option: string): boolean {
  const c = pkg.catering;
  switch (option) {
    case "Morning Breakfast":
      return c.morningBreakfast.length > 0;
    case "Tea/Coffee":
      return c.teaCoffee.length > 0;
    case "Lunch":
      return structuredMealHasItems(c.lunch);
    case "Evening Breakfast":
      return c.eveningBreakfast.length > 0;
    case "Evening Tea/Coffee":
      return c.eveningTeaCoffee.length > 0;
    case "Dinner":
      return structuredMealHasItems(c.dinner);
    default:
      return false;
  }
}

export function matchCatering(req: PlannerRequirements, pkg: EventPackage): CriterionScore {
  if (req.catering.length === 0) {
    return score(100, "No specific catering requirements given.");
  }
  const matched = req.catering.filter((opt) => cateringOptionIncluded(pkg, opt));
  const s = (matched.length / req.catering.length) * 100;
  if (matched.length === req.catering.length) {
    return score(s, `Includes all requested catering: ${matched.join(", ")}.`);
  }
  if (matched.length > 0) {
    return score(s, `Includes ${matched.length} of ${req.catering.length} requested catering categories (${matched.join(", ")}).`);
  }
  return score(0, "Does not include any of your requested catering categories.");
}
// ----------------------------------------------------------------------------
// 8. SERVICES (Dhol Tasha / Ghoda / Bhraman / Sound / Lighting)
// ----------------------------------------------------------------------------

function availabilityScore(a: ServiceAvailability): number {
  if (a === "included") return 100;
  if (a === "optional") return 50;
  return 0;
}

export function matchServices(
  req: PlannerRequirements,
  pkg: EventPackage
): CriterionScore {
  const requested: Array<{
    label: string;
    availability: ServiceAvailability;
  }> = [];

  if (req.services.dholTasha) {
    requested.push({
      label: "Dhol Tasha",
      availability: pkg.entertainment.dholTasha,
    });
  }

  if (req.services.ghoda) {
    requested.push({
      label: "Ghoda",
      availability: pkg.entertainment.ghoda,
    });
  }

  if (req.services.bhraman) {
    requested.push({
      label: "Bhraman",
      availability: pkg.entertainment.bhraman,
    });
  }

  if (req.services.sound) {
    requested.push({
      label: "Sound",
      availability: pkg.entertainment.sound.included
        ? "included"
        : "notIncluded",
    });
  }

  if (req.services.lighting) {
    requested.push({
      label: "Lighting",
      availability: pkg.entertainment.lighting.included
        ? "included"
        : "notIncluded",
    });
  }

  if (requested.length === 0) {
    return score(100, "No specific service requirements given.");
  }

  const scores = requested.map((r) =>
    availabilityScore(r.availability)
  );

  const avg =
    scores.reduce((a, b) => a + b, 0) / scores.length;

  const included = requested
    .filter((r) => r.availability === "included")
    .map((r) => r.label);

  const optional = requested
    .filter((r) => r.availability === "optional")
    .map((r) => r.label);

  const missing = requested
    .filter((r) => r.availability === "notIncluded")
    .map((r) => r.label);

  const parts: string[] = [];

  if (included.length) {
    parts.push(`${included.join(", ")} included`);
  }

  if (optional.length) {
    parts.push(
      `${optional.join(", ")} available as an optional add-on`
    );
  }

  if (missing.length) {
    parts.push(`${missing.join(", ")} not included`);
  }

  return score(avg, parts.join("; ") + ".");
}