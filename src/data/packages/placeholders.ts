// ============================================================================
// DEMO IMAGE PLACEHOLDERS — Phase 2
// ----------------------------------------------------------------------------
// Decoration photos are a mandatory part of the package data model (every
// decoration setup, plus package gallery/venue images, must carry one or
// more images). For this phase we have no real OM SAI decoration photography
// to attach, so every image in the demo dataset points at the project's
// existing local placeholder asset (`public/placeholder.svg`) instead of an
// invented external URL that could break.
//
// Centralizing placeholder creation here means swapping in real photos later
// is a one-file change to packages.ts (or eventually a CMS/DB), without
// touching this shape or the recommendation engine / UI that consume it.
// ============================================================================

import type { PackageImage, PackageImageList } from "./types";

/** The single local asset used to stand in for every demo image. */
export const PLACEHOLDER_IMAGE_SRC = "/placeholder.svg";

/**
 * Build one placeholder image entry with a descriptive alt text.
 * `label` should describe what the real photo will eventually show,
 * e.g. "Royal Celebration — Main Stage Setup".
 */
export function demoImage(label: string): PackageImage {
  return {
    src: PLACEHOLDER_IMAGE_SRC,
    alt: `${label} (demo placeholder — real photo to be added)`,
    isPlaceholder: true,
  };
}

/** Build a list of `count` placeholder images sharing the same label. */
export function demoImages(label: string, count = 1): PackageImageList {
  return Array.from({ length: count }, () => demoImage(label));
}
