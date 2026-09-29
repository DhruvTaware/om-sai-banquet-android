// ============================================================================
// PACKAGE DATA MODEL — Phase 2
// ----------------------------------------------------------------------------
// Type definitions for OM SAI event packages (Banquet Hall + Lawns).
//
// This model is intentionally decoupled from any specific storage mechanism.
// For Phase 2 the data lives in local TypeScript/JSON (see packages.ts), but
// every shape here is designed so a future backend/database can serialize to
// the exact same interfaces without the recommendation engine (Phase 3) or
// UI (Phase 4) needing to change.
//
// Shared concepts already defined for the planner wizard (EventType, the
// day/night timing enum, and the flat decoration "preference tags") live in
// `@/types/planner` and are reused below rather than re-declared, so the
// planner's requirements and a package's data can be compared directly in
// Phase 3 without a translation layer.
// ============================================================================

import type { EventType, DayNight } from "@/types/planner";

// ----------------------------------------------------------------------------
// VENUE
// ----------------------------------------------------------------------------

export const PACKAGE_VENUES = ["OM SAI BANQUET HALL", "OM SAI LAWNS"] as const;

export type PackageVenue = (typeof PACKAGE_VENUES)[number];

// ----------------------------------------------------------------------------
// TIMING
// ----------------------------------------------------------------------------

// Reuses the planner's day/night/flexible enum ("day" | "night" | "flexible")
// so Phase 3 can compare a package's supported timings against the user's
// `PlannerRequirements.dayNight` with no mapping step. A package can support
// more than one timing slot (e.g. a hall available for both day and night
// functions), hence the array.
export type PackageTiming = DayNight;

export const PACKAGE_TIMINGS: PackageTiming[] = ["day", "night", "flexible"];

// Optional concrete time window, only present when the package has a fixed
// start/end (e.g. a day function that must vacate by evening). Phase 3 can
// use this for finer-grained timing comparisons once that logic exists.
export interface TimingWindow {
  /** 24-hour "HH:mm" format, e.g. "10:00" */
  startTime?: string;
  /** 24-hour "HH:mm" format, e.g. "16:00" */
  endTime?: string;
}

// ----------------------------------------------------------------------------
// IMAGES
// ----------------------------------------------------------------------------
// Every image reference in the package model — decoration setups, gallery,
// venue shots — uses this same shape. `isPlaceholder` is set on every image
// in this Phase 2 demo dataset so it is unmistakable in the code/UI which
// images are real assets vs. stand-ins waiting to be replaced with actual
// OM SAI photography.

export interface PackageImage {
  /** Path to the image. Demo data only ever points at local placeholder assets. */
  src: string;
  /** Descriptive alt text. */
  alt: string;
  /** True for every image in the Phase 2 demo dataset. */
  isPlaceholder: boolean;
}

// Decoration photos are mandatory: every decoration setup below carries an
// `images` array with at least one entry, even when `included` is false or
// no real photography exists yet — it will simply hold a placeholder.
export type PackageImageList = PackageImage[];

// ----------------------------------------------------------------------------
// DECORATION
// ----------------------------------------------------------------------------

// One named decoration setup (Haldi, Vidhi, Main Stage, Varmala, Entry).
export interface DecorationSetupDetail {
  /** Whether this setup is part of the package. */
  included: boolean;
  /** Display name, e.g. "Premium Floral Haldi". */
  name: string;
  /** Short description of what's provided. */
  description: string;
  /** One or more photos for this setup. Always non-empty — see note above. */
  images: PackageImageList;
}

export const DECORATION_THEME_TAGS = [
  "Traditional Decoration",
  "Modern Decoration",
  "Theme Decoration",
  "Floral Decoration",
  "Other",
] as const;

export type DecorationThemeTag = (typeof DECORATION_THEME_TAGS)[number];

export interface PackageDecoration {
  haldiSetup: DecorationSetupDetail;
  vidhiSetup: DecorationSetupDetail;
  mainStageSetup: DecorationSetupDetail;
  varmalaSetup: DecorationSetupDetail;
  entrySetup: DecorationSetupDetail;
  /** Broad style tags for this package's decoration. */
  themeTags: DecorationThemeTag[];
  /** Free-form extras that don't fit a named setup (e.g. "Selfie Point", "Flower Chadar"). */
  otherDecorationItems: string[];
}

// ----------------------------------------------------------------------------
// ENTERTAINMENT & EVENT SERVICES
// ----------------------------------------------------------------------------

// "included" / "optional" / "notIncluded" is deliberately richer than a
// boolean so an add-on that's available-but-not-bundled (seen throughout the
// source material as "Optional") isn't collapsed into either "Yes" or "No".
export type ServiceAvailability = "included" | "optional" | "notIncluded";

export interface SoundLightingDetail {
  included: boolean;
  /** Free-form description, e.g. "Basic", "Premium", "Professional", "Decorative + Stage Lighting". */
  type: string;
}

export interface PackageEntertainment {
  dholTasha: ServiceAvailability;
  ghoda: ServiceAvailability;
  bhraman: ServiceAvailability;
  kakaService: ServiceAvailability;
  sound: SoundLightingDetail;
  lighting: SoundLightingDetail;
  /** Covers "LED Screen" / "LED Wall" (used interchangeably in source material). */
  ledScreenOrWall: ServiceAvailability;
  traditionalMusic: ServiceAvailability;
}

// ----------------------------------------------------------------------------
// CATERING
// ----------------------------------------------------------------------------

// Shared structured-meal shape used by both Lunch and Dinner so Phase 4 can
// render both with the same accordion/section component.
export interface StructuredMeal {
  breads: string[];
  dryBhaji: string[];
  wetBhaji: string[];
  salad: string[];
  rice: string[];
  dal: string[];
  sweet: string[];
  dessert: string[];
}

export interface PackageCatering {
  morningBreakfast: string[];
  teaCoffee: string[];
  lunch: StructuredMeal;
  eveningBreakfast: string[];
  eveningTeaCoffee: string[];
  dinner: StructuredMeal;
}

// ----------------------------------------------------------------------------
// SERVICE DETAILS
// ----------------------------------------------------------------------------

export interface PackageServiceDetails {
  waiters: number;
  waterBottles: number;
  tables: ServiceAvailability;
  chairs: ServiceAvailability;
  buffetCounters: ServiceAvailability;
  stageFurniture: ServiceAvailability;
  cleaning: ServiceAvailability;
}

// ----------------------------------------------------------------------------
// PACKAGE-LEVEL IMAGES (gallery / venue, as distinct from decoration photos)
// ----------------------------------------------------------------------------

export interface PackageImages {
  /** General package/gallery images. */
  gallery: PackageImageList;
  /** Shots of the venue itself for this package. */
  venue: PackageImageList;
}

// ----------------------------------------------------------------------------
// THE PACKAGE
// ----------------------------------------------------------------------------

export interface EventPackage {
  /** Stable unique identifier, e.g. "pkg-p001". Safe to use as a React key / DB primary key. */
  id: string;
  /** Human-facing package number, e.g. "P001". */
  packageNumber: string;
  name: string;
  description: string;
  venue: PackageVenue;
  /** A package may support multiple event types. */
  eventTypes: EventType[];
  /** Numeric guest count this package is built for (1–5000). Never a formatted string. */
  capacity: number;
  /** A package may support multiple timing slots. */
  timing: PackageTiming[];
  /** Present only when the package has a fixed time window. */
  timingWindow?: TimingWindow;
  /** Numeric price in INR. Never a formatted string. */
  price: number;
  decoration: PackageDecoration;
  entertainment: PackageEntertainment;
  catering: PackageCatering;
  services: PackageServiceDetails;
  /** Facilities not covered by a more specific field, e.g. "Parking", "Baby Cradle Setup". */
  otherFacilities: string[];
  images: PackageImages;
  /**
   * Always `true` in this Phase 2 dataset. Marks every package here as
   * development/demo data — NOT an actual current OM SAI commercial
   * package or price. Kept on the record itself (rather than only in a
   * variable name) so it survives being copied, filtered, or logged.
   */
  isDemoData: boolean;
}
