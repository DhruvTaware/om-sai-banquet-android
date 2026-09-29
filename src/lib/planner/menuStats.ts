// ============================================================================
// Small, isolated helper for counting catering menu items on a package.
// Split out of qa.ts purely so it's independently testable/reusable (e.g.
// a future "largest menu" badge on the results cards).
// ============================================================================

import type { PackageCatering, StructuredMeal } from "@/data/packages/types";

function countStructuredMeal(meal: StructuredMeal): number {
  return (
    meal.breads.length +
    meal.dryBhaji.length +
    meal.wetBhaji.length +
    meal.salad.length +
    meal.rice.length +
    meal.dal.length +
    meal.sweet.length +
    meal.dessert.length
  );
}

/** Total number of distinct menu items across every catering category on a package. */
export function countMenuItems(catering: PackageCatering): number {
  return (
    catering.morningBreakfast.length +
    catering.teaCoffee.length +
    countStructuredMeal(catering.lunch) +
    catering.eveningBreakfast.length +
    catering.eveningTeaCoffee.length +
    countStructuredMeal(catering.dinner)
  );
}
