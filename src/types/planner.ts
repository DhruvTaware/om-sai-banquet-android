// Shared types for the AI Event Planner feature.
// These describe the customer's requirements as collected by the wizard.
// The package data model (Phase 2) and recommendation engine (Phase 3)
// will consume this same shape.

export type EventType =
  | "Marriage"
  | "Birthday / Anniversary"
  | "Naming Ceremony"
  | "Engagement"
  | "Birthday"
  | "Haldi"
  | "Mehendi"
  | "Reception"
  | "Anniversary"
  | "Corporate Event"
  | "Religious/Cultural Event"
  | "Religious / Cultural Events"
  | "Family Function"
  | "Other"
  | "Others";

export const EVENT_TYPES: EventType[] = [
  "Marriage",
  "Birthday / Anniversary",
  "Naming Ceremony",
  "Engagement",
  "Religious / Cultural Events",
  "Others",
];

export type VenuePreference = "banquet" | "lawns" | "recommend";

export type DayNight = "day" | "night" | "flexible";

export const DECORATION_OPTIONS = [
  "Haldi Setup",
  "Vidhi Setup",
  "Main Stage Setup",
  "Varmala Setup",
  "Entry Setup",
  "Special Theme Decoration",
  "Traditional Decoration",
  "Modern Decoration",
  // Kept for requirements saved by older wizard versions.
  "Special/Theme Decoration",
] as const;

export type DecorationOption = (typeof DECORATION_OPTIONS)[number];

export const MARRIAGE_DECORATION_OPTIONS: DecorationOption[] = [
  "Haldi Setup",
  "Vidhi Setup",
  "Main Stage Setup",
  "Varmala Setup",
  "Entry Setup",
];

export const GENERAL_DECORATION_OPTIONS: DecorationOption[] = [
  "Special Theme Decoration",
  "Traditional Decoration",
  "Modern Decoration",
];

export const CATERING_OPTIONS = [
  "Morning Breakfast",
  "Tea/Coffee",
  "Lunch",
  "Evening Breakfast",
  "Evening Tea/Coffee",
  "Dinner",
] as const;

export type CateringOption = (typeof CATERING_OPTIONS)[number];

export interface AdditionalServices {
  dholTasha: boolean;
  ghoda: boolean;
  bhraman: boolean;
  sound: boolean;
  lighting: boolean;
  other: string;
}
export interface PlannerRequirements {
  eventType: EventType | "";
  venue: VenuePreference | "";
  eventDate: string; // ISO date string, collected for reference/contact only
  guests: number | "";
  budget: number | "";
  budgetToleranceOverride?: number; // future-ready: user-adjustable search tolerance
  dayNight: DayNight | "";
  preferredTiming: string;
  decoration: DecorationOption[];
  catering: CateringOption[];
  services: AdditionalServices;
  additionalRequirements: string;
}

export const DEFAULT_PLANNER_REQUIREMENTS: PlannerRequirements = {
  eventType: "",
  venue: "",
  eventDate: "",
  guests: "",
  budget: "",
  dayNight: "",
  preferredTiming: "",
  decoration: [],
  catering: [],
  services: {
  dholTasha: false,
  ghoda: false,
  bhraman: false,
  sound: false,
  lighting: false,
  other: "",
  },
  additionalRequirements: "",
};

// Default budget search tolerance (Phase 3 will read this from a single
// configurable location rather than hardcoding it across the app).
export const DEFAULT_BUDGET_TOLERANCE = 50000;

export const PLANNER_STORAGE_KEY = "omsai-planner-requirements";
