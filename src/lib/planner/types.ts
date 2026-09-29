// ============================================================================
// RECOMMENDATION ENGINE — shared types (Phase 3)
// ----------------------------------------------------------------------------
// Output shapes produced by the recommendation engine. Kept separate from
// `@/data/packages/types` (the package data model, Phase 2) and
// `@/types/planner` (the wizard's requirement shape, Phase 1) — this file
// only describes what Phase 3 adds on top of those.
// ============================================================================

import type { EventPackage } from "@/data/packages/types";

/** Per-criterion score, always 0–100, plus a short label a UI can render directly. */
export interface CriterionScore {
  /** Raw 0–100 score for this single criterion. */
  score: number;
  /** Human-readable one-line note explaining this criterion's outcome. Empty string if not notable. */
  note: string;
}

/** The full, transparent breakdown behind a package's final weighted score. */
export interface ScoreBreakdown {
  eventType: CriterionScore;
  venue: CriterionScore;
  capacity: CriterionScore;
  budget: CriterionScore;
  timing: CriterionScore;
  services: CriterionScore;
  decoration: CriterionScore;
  catering: CriterionScore;
}

export interface PackageRecommendation {
  package: EventPackage;
  /** Final weighted score, 0–100, rounded to the nearest whole percentage point. */
  score: number;
  /** Transparent per-criterion breakdown that produced `score`. */
  breakdown: ScoreBreakdown;
  /** Plain-language reasons this package was recommended, derived only from `breakdown`/package data. */
  reasons: string[];
  /**
   * Set when this package is being shown despite failing a hard filter
   * (wrong event type and/or wrong venue) because too few strict matches
   * existed. Explains exactly which requirement(s) it doesn't meet.
   */
  mismatchWarnings: string[];
  /** Convenience: package.price / user's guest count, when guest count is known. */
  estimatedCostPerGuest: number | null;
}

export interface RecommendationResponse {
  /** Top matches that satisfied the hard filters (event type + explicit venue). */
  recommendations: PackageRecommendation[];
  /**
   * True when `recommendations` had to be backfilled with packages that
   * failed a hard filter because fewer than
   * `RECOMMENDATION_CONFIG.minPreferredRecommendations` strict matches existed.
   */
  isFallback: boolean;
  /** Set when there were zero strict matches at all (fully explains the fallback banner). */
  noStrictMatches: boolean;
}
