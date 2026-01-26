// index.node.js (Node / SSR entry)

import * as core from "./pkg/nodejs/hqr_generate.js";

/**
 * Default generator (PNG)
 */
export function generate(text, opts) {
  return core.generate_png(text, opts);
}

/**
 * Generate QR as PNG
 */
export function generate_png(text, opts) {
  return core.generate_png(text, opts);
}

/**
 * Generate QR as SVG
 */
export function generate_svg(text, opts) {
  return core.generate_svg(text, opts);
}

/**
 * Generate QR as JPG
 */
export function generate_jpg(text, opts) {
  return core.generate_jpg(text, opts);
}

/**
 * Generate QR as WebP
 */
export function generate_webp(text, opts) {
  return core.generate_webp(text, opts);
}

/**
 * Decode QR
 *
 * @param {Uint8Array | ImageData} input
 */
export function decode(input) {
  return core.decode(input);
}
