// index.node.js (Node / SSR entry)

import * as core from "./pkg/nodejs/hqr_generate.js";

/**
 * Default generator (PNG)
 */
export function generate(text, opts) {
  return core.generate_png(text, opts.size, opts.margin, opts.ecc);
}

/**
 * Generate QR as PNG
 */
export function generate_png(text, opts) {
  return core.generate_png(text, opts.size, opts.margin, opts.ecc);
}

/**
 * Generate QR as SVG
 */
export function generate_svg(text, opts) {
  return core.generate_svg(text, opts.size, opts.margin, opts.ecc);
}

/**
 * Decode QR
 *
 * @param {Uint8Array | ImageData} input
 */
export function decode(input) {
  return core.decode(input);
}
