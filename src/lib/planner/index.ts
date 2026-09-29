// Public entry point for the Phase 3 recommendation engine.
export { RECOMMENDATION_CONFIG } from "./config";
export type { RecommendationConfig } from "./config";
export { getRecommendations, getRecommendationForPackage, scorePackage } from "./recommendationEngine";
export type { PackageRecommendation, RecommendationResponse, ScoreBreakdown, CriterionScore } from "./types";
export { answerPredefinedQuestion, PREDEFINED_QUESTIONS } from "./qa";
export type { PredefinedQuestion } from "./qa";
export { extractHints } from "./additionalRequirementsParser";
export type { AdditionalRequirementHints } from "./additionalRequirementsParser";
export { countMenuItems } from "./menuStats";
