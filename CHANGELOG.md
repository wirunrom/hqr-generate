## [0.4.2] - 2026-01-29

### Fixed

- Fixed ESM export paths by adding explicit `.js` extensions.
  This resolves `ERR_MODULE_NOT_FOUND` in Next.js Pages Router and Node ESM.

## [0.4.4] - 2026-02-05

### Fixed

- Fixed quiet zone (`margin`) not being applied due to incorrect parameter mapping between the JavaScript wrapper and the WASM function, causing the margin value to always fall back to the default.
