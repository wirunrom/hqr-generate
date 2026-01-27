import init, {
  generate_png as _generate_png,
  generate_svg as _generate_svg,
  decode as _decode,
} from "./pkg/bundler/hqr_generate.js";

let _initPromise;

/** @returns {Promise<void>} */
async function ensureInit() {
  _initPromise ??= init();
  return _initPromise;
}

/**
 * @param {string} text
 * @param {{
 *   size?: number,
 *   margin?: number,
 *   ecc?: "L" | "M" | "Q" | "H"
 * }} [opts]
 * @returns {Promise<Uint8Array>}
 */
export async function generate(text, opts) {
  await ensureInit();
  return _generate_png(text, opts);
}

export async function generate_png(text, opts) {
  await ensureInit();
  return _generate_png(text, opts);
}

export async function generate_svg(text, opts) {
  await ensureInit();
  return _generate_svg(text, opts);
}

/**
 * Decode QR
 * - ImageData (browser)
 * - Uint8Array (bundler env)
 */
export async function decode(input) {
  await ensureInit();
  return _decode(input);
}
