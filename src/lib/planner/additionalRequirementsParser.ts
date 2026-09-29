// ============================================================================
// ADDITIONAL REQUIREMENTS — free-text keyword parser (Phase 3)
// ----------------------------------------------------------------------------
// `PlannerRequirements.additionalRequirements` is free-form text the user
// types in their own words. The brief is explicit that Phase 3 must NOT
// pretend a keyword scan is "AI" — this module is a small, transparent,
// optional helper that is kept completely separate from the deterministic
// recommendation engine's scoring. The engine works correctly whether this
// module is used or not, and whether the text is empty or not.
//
// FUTURE AI ARCHITECTURE:
// A real NLP/LLM layer can later replace the body of `extractHints()` with
// a call that returns the same `AdditionalRequirementHints` shape (or a
// richer superset of it), turning free text into structured signals — the
// engine and UI would not need to change, because this is the seam between
// "requirement extraction" and "recommendation engine" described in the
// Phase 3 brief.
// ============================================================================

export interface AdditionalRequirementHints {
  /** Keywords found that hint at a decoration preference, verbatim from the text. */
  mentionsDecorationKeywords: string[];
  /** Keywords found that hint at a catering preference, verbatim from the text. */
  mentionsCateringKeywords: string[];
  /** Keywords found that hint at a service (DJ/Ghoda Bhraman/sound/lighting), verbatim from the text. */
  mentionsServiceKeywords: string[];
  /** True if the text is empty/whitespace-only. */
  isEmpty: boolean;
}

const DECORATION_KEYWORDS = ["floral", "theme", "traditional", "modern", "stage", "entry", "mandap", "haldi", "varmala"];
const CATERING_KEYWORDS = ["breakfast", "lunch", "dinner", "tea", "coffee", "buffet", "food", "menu"];
const SERVICE_KEYWORDS = ["dj", "ghoda", "horse", "sound", "lighting", "led", "music"];

/**
 * Purely transparent keyword matching over the free-text field — NOT an NLP
 * or AI system. Returns which known keywords were literally present in the
 * text, for optional display (e.g. "we noticed you mentioned: DJ, floral")
 * or for a future real AI layer to build on. Never used to silently change
 * a score.
 */
export function extractHints(additionalRequirements: string): AdditionalRequirementHints {
  const text = additionalRequirements.toLowerCase().trim();
  if (!text) {
    return { mentionsDecorationKeywords: [], mentionsCateringKeywords: [], mentionsServiceKeywords: [], isEmpty: true };
  }

  const find = (keywords: string[]) => keywords.filter((kw) => text.includes(kw));

  return {
    mentionsDecorationKeywords: find(DECORATION_KEYWORDS),
    mentionsCateringKeywords: find(CATERING_KEYWORDS),
    mentionsServiceKeywords: find(SERVICE_KEYWORDS),
    isEmpty: false,
  };
}
