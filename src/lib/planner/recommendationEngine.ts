// ============================================================================
// DETERMINISTIC PACKAGE RECOMMENDATION ENGINE — Phase 3
// ----------------------------------------------------------------------------
// Pure, transparent, rules-based matching between a customer's
// `PlannerRequirements` (Phase 1) and the OM SAI package dataset (Phase 2).
//
// IMPORTANT — NOT AN LLM:
// This is a deterministic rules/scoring engine, not a language model. Same
// requirements + same package dataset always produce the same result. It is
// deliberately built with a clean seam (see `additionalRequirementsParser.ts`
// and the "FUTURE AI ARCHITECTURE" notes below) so a real AI/NLP layer can
// be introduced later — to turn natural language into `PlannerRequirements`,
// or to replace the deterministic Q&A in `qa.ts` — without this engine, the
// package data, or the UI needing to be rewritten.
//
//   User natural language
//         |
//         v
//   AI/NLP requirement extraction   <-- future phase, not built here
//         |
//         v
//   PlannerRequirements              <-- Phase 1 (already built)
//         |
//         v
//   Deterministic Recommendation Engine   <-- this file (Phase 3)
//         |
//         v
//   Packages                         <-- Phase 2 (already built)
//
// No business logic lives in React components — components only call the
// functions exported here and render the result.
// ============================================================================

import type { PlannerRequirements } from "@/types/planner";
import type { EventPackage } from "@/data/packages/types";
import { RECOMMENDATION_CONFIG } from "./config";
import {
  matchEventType,
  matchVenue,
  matchCapacity,
  matchBudget,
  matchTiming,
  matchDecoration,
  matchCatering,
  matchServices,
  eventTypeMatches,
} from "./matchers";
import type { PackageRecommendation, RecommendationResponse, ScoreBreakdown } from "./types";

// ----------------------------------------------------------------------------
// Scoring a single package
// ----------------------------------------------------------------------------

function buildBreakdown(req: PlannerRequirements, pkg: EventPackage): ScoreBreakdown {
  return {
    eventType: matchEventType(req, pkg),
    venue: matchVenue(req, pkg),
    capacity: matchCapacity(req, pkg),
    budget: matchBudget(req, pkg),
    timing: matchTiming(req, pkg),
    services: matchServices(req, pkg),
    decoration: matchDecoration(req, pkg),
    catering: matchCatering(req, pkg),
  };
}

function weightedTotal(breakdown: ScoreBreakdown): number {
  const w = RECOMMENDATION_CONFIG.weights;
  const total =
    (breakdown.eventType.score * w.eventType +
      breakdown.venue.score * w.venue +
      breakdown.capacity.score * w.capacity +
      breakdown.budget.score * w.budget +
      breakdown.timing.score * w.timing +
      breakdown.services.score * w.services +
      breakdown.decoration.score * w.decoration +
      breakdown.catering.score * w.catering) /
    100;
  return Math.round(total);
}

function buildReasons(req: PlannerRequirements, breakdown: ScoreBreakdown): string[] {
  const reasons: string[] = [];

  if (req.eventType && breakdown.eventType.score === 100) reasons.push(breakdown.eventType.note);
  if (req.venue && req.venue !== "recommend" && breakdown.venue.score === 100) reasons.push(breakdown.venue.note);
  if (breakdown.capacity.score >= 75) reasons.push(breakdown.capacity.note);
  if (breakdown.budget.score >= 70) reasons.push(breakdown.budget.note);
  if (req.dayNight && req.dayNight !== "flexible" && breakdown.timing.score >= 80) reasons.push(breakdown.timing.note);
  if (breakdown.services.score > 0 && breakdown.services.note !== "No specific service requirements given.")
    reasons.push(breakdown.services.note);
  if (breakdown.decoration.score > 0 && req.decoration.length > 0) reasons.push(breakdown.decoration.note);
  if (breakdown.catering.score > 0 && req.catering.length > 0) reasons.push(breakdown.catering.note);

  return reasons;
}

function buildMismatchWarnings(req: PlannerRequirements, breakdown: ScoreBreakdown): string[] {
  const warnings: string[] = [];
  if (req.eventType && breakdown.eventType.score === 0) warnings.push(breakdown.eventType.note);
  if (req.venue && req.venue !== "recommend" && breakdown.venue.score === 0) warnings.push(breakdown.venue.note);
  if (breakdown.capacity.score < 20) warnings.push(breakdown.capacity.note);
  if (breakdown.budget.score < 20) warnings.push(breakdown.budget.note);
  return warnings;
}

/** Score a single package against a set of requirements. Pure function, fully deterministic. */
export function scorePackage(req: PlannerRequirements, pkg: EventPackage): PackageRecommendation {
  const breakdown = buildBreakdown(req, pkg);
  const guests = typeof req.guests === "number" ? req.guests : Number(req.guests);
  const estimatedCostPerGuest = guests > 0 ? Math.round(pkg.price / guests) : null;

  return {
    package: pkg,
    score: weightedTotal(breakdown),
    breakdown,
    reasons: buildReasons(req, breakdown),
    mismatchWarnings: buildMismatchWarnings(req, breakdown),
    estimatedCostPerGuest,
  };
}

// ----------------------------------------------------------------------------
// Hard filters — "eligible" packages for the *normal* (non-fallback) path
// ----------------------------------------------------------------------------

function passesHardFilters(req: PlannerRequirements, pkg: EventPackage): boolean {
  if (req.eventType && !eventTypeMatches(req.eventType, pkg.eventTypes)) return false;
  if (req.venue === "banquet" && pkg.venue !== "OM SAI BANQUET HALL") return false;
  if (req.venue === "lawns" && pkg.venue !== "OM SAI LAWNS") return false;
  return true;
}

// ----------------------------------------------------------------------------
// Top-level API
// ----------------------------------------------------------------------------

/**
 * Run the full recommendation flow: filter -> score -> rank -> top N.
 * Data-driven only — never hardcodes a package id/number. If the dataset
 * changes, recommendations change automatically.
 */
export function getRecommendations(
  requirements: PlannerRequirements,
  packages: EventPackage[] = [],
): RecommendationResponse {
  const maxResults = RECOMMENDATION_CONFIG.maxRecommendations;

  const eligible = packages.filter((pkg) => passesHardFilters(requirements, pkg));
  const strictScored = eligible
    .map((pkg) => scorePackage(requirements, pkg))
    .sort((a, b) => b.score - a.score);

  // 1+ strict matches: show only real matches, never pad with mismatched
  // packages just to hit a target count ("do not invent results").
  if (strictScored.length > 0) {
    return {
      recommendations: strictScored.slice(0, maxResults),
      isFallback: false,
      noStrictMatches: false,
    };
  }

  // Zero strict matches: nothing satisfies the hard filters (event type
  // and/or explicit venue). Fall back to the closest alternatives from the
  // full dataset, clearly labelled as such by the caller (`isFallback`).
  const allScored = packages
    .map((pkg) => scorePackage(requirements, pkg))
    .sort((a, b) => b.score - a.score);

  return {
    recommendations: allScored.slice(0, maxResults),
    isFallback: true,
    noStrictMatches: true,
  };
}

/** Score a single known package against stored requirements (used by the package-details page). */
export function getRecommendationForPackage(
  requirements: PlannerRequirements,
  pkg: EventPackage,
): PackageRecommendation {
  return scorePackage(requirements, pkg);
}
