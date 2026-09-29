// Shared package types and utilities.
// Package records are loaded from MongoDB through the backend API.

export * from "./types";

export { validatePackages } from "./validation";

export type {
  ValidationIssue,
  ValidationResult,
} from "./validation";

export {
  demoImage,
  demoImages,
  PLACEHOLDER_IMAGE_SRC,
} from "./placeholders";