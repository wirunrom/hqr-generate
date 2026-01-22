import init, {
  qr_png_data_url as _qr_png_data_url,
  qr_png_bytes as _qr_png_bytes,
} from "./pkg/web/hqr_generate.js";

let _initPromise;

function eccToU8(ecc) {
  switch (ecc) {
    case "L":
      return 0;
    case "M":
      return 1;
    case "H":
      return 3;
    default:
      return 2;
  }
}

/** @returns {Promise<void>} */
async function ensureInit() {
  if (!_initPromise) _initPromise = init();
  await _initPromise;
}

/**
 * @param {string} text
 * @param {number} [size=320]
 * @param {number} [margin=4]
 * @param {"L"|"M"|"Q"|"H"} [ecc="Q"]
 * @returns {Promise<string>}
 */
export async function qr_png_data_url(text, size = 320, margin = 4, ecc = "Q") {
  await ensureInit();
  return _qr_png_data_url(text, size, margin, eccToU8(ecc));
}

export async function qr_png_bytes(text, size = 320, margin = 4, ecc = "Q") {
  await ensureInit();
  return _qr_png_bytes(text, size, margin, eccToU8(ecc));
}
