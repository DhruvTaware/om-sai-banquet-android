// ============================================================================
// RECOMMENDATION ENGINE CONFIGURATION — Phase 3
// ----------------------------------------------------------------------------
// Single source of truth for every tunable tolerance/weight used by the
// deterministic recommendation engine. Nothing in `recommendationEngine.ts`
// (or anywhere else in the app) should hardcode these numbers directly —
// import them from here instead, so tuning the engine is a one-file change.
// ============================================================================

export const RECOMMENDATION_CONFIG = {
  /** ± percentage band around the user's guest count considered "on target". */
  capacityTolerancePercent: 10,

  /** Flat rupee tolerance above the user's stated budget still considered acceptable. */
  budgetTolerance: 50000,

  /** Maximum number of packages ever returned from a single recommendation call. */
  maxRecommendations: 4,

  /** Minimum number of "normal" (non-fallback) matches we'd like before we
   * consider falling back to closest-alternatives instead. */
  minPreferredRecommendations: 3,

  /**
   * Weighted scoring criteria. Must sum to 100. Guest capacity and budget are
   * intentionally the two largest single factors (per the brief), with event
   * type and venue preference also weighted heavily since they are usually
   * non-negotiable choices the user already made explicitly.
   */
  weights: {
    eventType: 25,
    venue: 15,
    capacity: 20,
    budget: 20,
    timing: 10,
    services: 5,
    decoration: 3,
    catering: 2,
  },
} as const;

// Sanity check (runs once at module load, dev-time only cost) — keeps the
// weights honest if someone edits them later without re-normalizing.
const WEIGHT_SUM = Object.values(RECOMMENDATION_CONFIG.weights).reduce((a, b) => a + b, 0);
if (WEIGHT_SUM !== 100 && import.meta.env?.DEV) {
  console.warn(`[recommendationEngine] RECOMMENDATION_CONFIG.weights sum to ${WEIGHT_SUM}, expected 100.`);
}

export type RecommendationConfig = typeof RECOMMENDATION_CONFIG;
