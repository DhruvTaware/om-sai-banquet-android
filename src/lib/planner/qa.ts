// ============================================================================
// DETERMINISTIC QUESTION-ANSWER LAYER — Phase 3
// ----------------------------------------------------------------------------
// Answers a small set of predefined questions about the current
// recommendations, using only the package data and scores already computed
// by `recommendationEngine.ts`. This is explicitly NOT an LLM — no API call,
// no generation, just deterministic lookups/aggregations over structured
// data. Kept in its own module so a future real AI service can be swapped in
// behind the same `answerPredefinedQuestion` signature without the results
// page needing to change.
// ============================================================================

import type { PackageRecommendation } from "./types";
import type { PlannerRequirements } from "@/types/planner";
import { countMenuItems } from "./menuStats";

export const PREDEFINED_QUESTIONS = [
  "Which is the cheapest package?",
  "Which package has DJ?",
  "Which package includes Ghoda Bhraman?",
  "Which package is best for my guest count?",
  "Which package has the largest food menu?",
  "Why was this package recommended?",
  "What is the difference between these packages?",
] as const;

export type PredefinedQuestion = (typeof PREDEFINED_QUESTIONS)[number];

function nameOf(rec: PackageRecommendation): string {
  return `${rec.package.packageNumber} — ${rec.package.name}`;
}

export function answerPredefinedQuestion(
  question: PredefinedQuestion,
  recommendations: PackageRecommendation[],
  requirements: PlannerRequirements,
): string {
  if (recommendations.length === 0) {
    return "There are no recommended packages to answer this from yet.";
  }

  switch (question) {
    case "Which is the cheapest package?": {
      const cheapest = [...recommendations].sort((a, b) => a.package.price - b.package.price)[0];
      return `${nameOf(cheapest)} is the most affordable of your recommended packages, at ₹${cheapest.package.price.toLocaleString("en-IN")}.`;
    }

    case "Which package has DJ?": {
      const withDj = recommendations.filter((r) => r.package.entertainment.dholTasha === "included");
      if (withDj.length === 0) {
        const optional = recommendations.filter((r) => r.package.entertainment.dholTasha === "optional");
        if (optional.length > 0) {
          return `None of your recommended packages include DJ by default, but ${optional.map(nameOf).join(", ")} offer it as an optional add-on.`;
        }
        return "None of your recommended packages include DJ.";
      }
      return `${withDj.map(nameOf).join(", ")} include${withDj.length === 1 ? "s" : ""} DJ.`;
    }

    case "Which package includes Ghoda Bhraman?": {
      const withGhoda = recommendations.filter((r) => r.package.entertainment.ghoda === "included");
      if (withGhoda.length === 0) {
        const optional = recommendations.filter((r) => r.package.entertainment.ghoda === "optional");
        if (optional.length > 0) {
          return `None of your recommended packages include Ghoda Bhraman by default, but ${optional.map(nameOf).join(", ")} offer it as an optional add-on.`;
        }
        return "None of your recommended packages include Ghoda Bhraman.";
      }
      return `${withGhoda.map(nameOf).join(", ")} include${withGhoda.length === 1 ? "s" : ""} Ghoda Bhraman.`;
    }

    case "Which package is best for my guest count?": {
      const guests = typeof requirements.guests === "number" ? requirements.guests : Number(requirements.guests);
      if (!guests) return "Add your guest count in the planner and we can answer this precisely.";
      const best = [...recommendations].sort((a, b) => b.breakdown.capacity.score - a.breakdown.capacity.score)[0];
      return `${nameOf(best)} (capacity ${best.package.capacity.toLocaleString("en-IN")}) is the closest fit for your ${guests.toLocaleString("en-IN")} guests.`;
    }

    case "Which package has the largest food menu?": {
      const withCounts = recommendations.map((r) => ({ rec: r, count: countMenuItems(r.package.catering) }));
      const largest = [...withCounts].sort((a, b) => b.count - a.count)[0];
      return `${nameOf(largest.rec)} offers the largest catering menu among your recommendations, with ${largest.count} distinct items across all meal categories.`;
    }

    case "Why was this package recommended?": {
      const top = recommendations[0];
      const reasons = top.reasons.length > 0 ? top.reasons.join(" ") : "It scored highest overall against your requirements.";
      return `${nameOf(top)} is your top match (${top.score}% match). ${reasons}`;
    }

    case "What is the difference between these packages?": {
      if (recommendations.length < 2) {
        return "Add at least two packages to compare — use \"Add to Compare\" on the results page.";
      }
      const lines = recommendations
        .slice(0, 4)
        .map(
          (r) =>
            `${nameOf(r)}: ${r.package.venue}, capacity ${r.package.capacity.toLocaleString("en-IN")}, ₹${r.package.price.toLocaleString("en-IN")}, ${r.score}% match`,
        );
      return lines.join(" | ");
    }

    default:
      return "Sorry, I don't have a deterministic answer for that question yet.";
  }
}
