// ============================================================================
// PACKAGE DATA VALIDATION — Phase 2
// ----------------------------------------------------------------------------
// A small, dependency-free sanity check for the package dataset. Intended to
// be called once during development/tests (or CI) to catch data-entry
// mistakes early, not as production-critical logic.
// ============================================================================

import { PACKAGE_VENUES, PACKAGE_TIMINGS } from "./types";
import type { EventPackage, ServiceAvailability } from "./types";

const SERVICE_AVAILABILITY_VALUES: ServiceAvailability[] = [
  "included",
  "optional",
  "notIncluded",
];

export interface ValidationIssue {
  packageId: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/**
 * Validate a set of packages. Checks the rules called out in the Phase 2
 * brief: unique ids/numbers, capacity bounds, numeric price, at least one
 * event type, a valid venue, valid timing values, food categories as
 * arrays, and valid service availability values.
 */
export function validatePackages(packages: EventPackage[]): ValidationResult {
  const issues: ValidationIssue[] = [];
  const seenIds = new Set<string>();
  const seenNumbers = new Set<string>();

  for (const pkg of packages) {
    const ref = pkg.packageNumber || pkg.id || "(unknown package)";

    // Required fields present
    if (!pkg.id) issues.push({ packageId: ref, message: "Missing id." });
    if (!pkg.packageNumber) issues.push({ packageId: ref, message: "Missing packageNumber." });
    if (!pkg.name) issues.push({ packageId: ref, message: "Missing name." });
    if (!pkg.description) issues.push({ packageId: ref, message: "Missing description." });

    // Unique id / packageNumber
    if (pkg.id) {
      if (seenIds.has(pkg.id)) {
        issues.push({ packageId: ref, message: `Duplicate id: ${pkg.id}` });
      }
      seenIds.add(pkg.id);
    }
    if (pkg.packageNumber) {
      if (seenNumbers.has(pkg.packageNumber)) {
        issues.push({ packageId: ref, message: `Duplicate packageNumber: ${pkg.packageNumber}` });
      }
      seenNumbers.add(pkg.packageNumber);
    }

    // Venue
    if (!PACKAGE_VENUES.includes(pkg.venue)) {
      issues.push({ packageId: ref, message: `Invalid venue: ${pkg.venue}` });
    }

    // Event types
    if (!Array.isArray(pkg.eventTypes) || pkg.eventTypes.length === 0) {
      issues.push({ packageId: ref, message: "Must have at least one event type." });
    }

    // Capacity
    if (typeof pkg.capacity !== "number" || Number.isNaN(pkg.capacity)) {
      issues.push({ packageId: ref, message: "Capacity must be numeric." });
    } else if (pkg.capacity < 1 || pkg.capacity > 5000) {
      issues.push({ packageId: ref, message: `Capacity out of range (1-5000): ${pkg.capacity}` });
    }

    // Price
    if (typeof pkg.price !== "number" || Number.isNaN(pkg.price) || pkg.price < 0) {
      issues.push({ packageId: ref, message: `Price must be a non-negative number: ${pkg.price}` });
    }

    // Timing
    if (!Array.isArray(pkg.timing) || pkg.timing.length === 0) {
      issues.push({ packageId: ref, message: "Must have at least one timing value." });
    } else {
      for (const t of pkg.timing) {
        if (!PACKAGE_TIMINGS.includes(t)) {
          issues.push({ packageId: ref, message: `Invalid timing value: ${t}` });
        }
      }
    }

    // Decoration: every setup must have a non-empty images array
    const setups = [
      ["haldiSetup", pkg.decoration?.haldiSetup],
      ["vidhiSetup", pkg.decoration?.vidhiSetup],
      ["mainStageSetup", pkg.decoration?.mainStageSetup],
      ["varmalaSetup", pkg.decoration?.varmalaSetup],
      ["entrySetup", pkg.decoration?.entrySetup],
    ] as const;
    for (const [key, setup] of setups) {
      if (!setup) {
        issues.push({ packageId: ref, message: `Missing decoration.${key}.` });
        continue;
      }
      if (!Array.isArray(setup.images) || setup.images.length === 0) {
        issues.push({ packageId: ref, message: `decoration.${key}.images must be a non-empty array.` });
      }
    }

    // Entertainment service availability values
        const availabilityFields: [string, ServiceAvailability][] = [
        ["dholTasha", pkg.entertainment?.dholTasha],
        ["ghoda", pkg.entertainment?.ghoda],
        ["bhraman", pkg.entertainment?.bhraman],
        ["kakaService", pkg.entertainment?.kakaService],
        ["ledScreenOrWall", pkg.entertainment?.ledScreenOrWall],
        ["traditionalMusic", pkg.entertainment?.traditionalMusic],
      ];
    for (const [field, value] of availabilityFields) {
      if (!SERVICE_AVAILABILITY_VALUES.includes(value)) {
        issues.push({ packageId: ref, message: `Invalid entertainment.${field}: ${value}` });
      }
    }

    // Service details availability values + numeric fields
    if (typeof pkg.services?.waiters !== "number") {
      issues.push({ packageId: ref, message: "services.waiters must be numeric." });
    }
    if (typeof pkg.services?.waterBottles !== "number") {
      issues.push({ packageId: ref, message: "services.waterBottles must be numeric." });
    }
    const serviceAvailabilityFields: [string, ServiceAvailability][] = [
      ["tables", pkg.services?.tables],
      ["chairs", pkg.services?.chairs],
      ["buffetCounters", pkg.services?.buffetCounters],
      ["stageFurniture", pkg.services?.stageFurniture],
      ["cleaning", pkg.services?.cleaning],
    ];
    for (const [field, value] of serviceAvailabilityFields) {
      if (!SERVICE_AVAILABILITY_VALUES.includes(value)) {
        issues.push({ packageId: ref, message: `Invalid services.${field}: ${value}` });
      }
    }

    // otherFacilities must be an array of strings
    if (!isStringArray(pkg.otherFacilities)) {
      issues.push({ packageId: ref, message: "otherFacilities must be a string array." });
    }

    // Food categories must be arrays
    const meals = [
      ["catering.lunch", pkg.catering?.lunch],
      ["catering.dinner", pkg.catering?.dinner],
    ] as const;
    for (const [mealKey, meal] of meals) {
      if (!meal) {
        issues.push({ packageId: ref, message: `Missing ${mealKey}.` });
        continue;
      }
      for (const cat of ["breads", "dryBhaji", "wetBhaji", "salad", "rice", "dal", "sweet", "dessert"] as const) {
        if (!isStringArray(meal[cat])) {
          issues.push({ packageId: ref, message: `${mealKey}.${cat} must be a string array.` });
        }
      }
    }
    for (const [flatKey, flatList] of [
      ["catering.morningBreakfast", pkg.catering?.morningBreakfast],
      ["catering.teaCoffee", pkg.catering?.teaCoffee],
      ["catering.eveningBreakfast", pkg.catering?.eveningBreakfast],
      ["catering.eveningTeaCoffee", pkg.catering?.eveningTeaCoffee],
    ] as const) {
      if (!isStringArray(flatList)) {
        issues.push({ packageId: ref, message: `${flatKey} must be a string array.` });
      }
    }

        for (const [flatKey, flatList] of [
      ["catering.morningBreakfast", pkg.catering?.morningBreakfast],
      ["catering.teaCoffee", pkg.catering?.teaCoffee],
      ["catering.eveningBreakfast", pkg.catering?.eveningBreakfast],
      ["catering.eveningTeaCoffee", pkg.catering?.eveningTeaCoffee],
    ] as const) {
      if (!isStringArray(flatList)) {
        issues.push({ packageId: ref, message: `${flatKey} must be a string array.` });
      }
    }
  }

  return { valid: issues.length === 0, issues };
}