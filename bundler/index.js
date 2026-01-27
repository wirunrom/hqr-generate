import init, {
  generate_png as _generate_png,
  generate_svg as _generate_svg,
  decode as _decode,
} from "../pkg/bundler/hqr_generate.js";

let _initPromise;

/** @returns {Promise<void>} */
async function ensureInit() {
  _initPromise ??= init();
  return _initPromise;
}

/**
 * Default generator (PNG)
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
 */
export async function decode(input) {
  await ensureInit();
  return _decode(input);
}
