let _initPromise;
let _modPromise;

async function loadWasm() {
  if (!_modPromise) {
    _modPromise = import("./pkg/hqr_generate.js");
  }
  const mod = await _modPromise;

  const initFn =
    mod.default ?? mod.__wbg_init ?? mod.init ?? mod.__wbindgen_start;

  if (typeof initFn === "function") {
    if (!_initPromise) _initPromise = initFn();
    await _initPromise;
  }

  return mod;
}

export async function qr_png_data_url(text, size = 320, margin = 4, ecc = "Q") {
  const mod = await loadWasm();
  return mod.qr_png_data_url(text, size, margin, ecc);
}
