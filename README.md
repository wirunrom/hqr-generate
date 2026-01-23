# @wirunrom/hqr-generate

A **stable black-and-white QR Code generator** that returns **PNG Data URLs or PNG bytes**, powered by **Rust + WebAssembly (WASM)**.

This library is designed with a **scan-reliability-first** mindset and a **frontend-first API**, making it easy to use in modern web applications without additional configuration.

---

## Features

- High-contrast **black & white only** output (maximum scan compatibility)
- Optimized for both **old and new mobile devices**
- Deterministic and consistent QR output
- Lightweight and fast (**Rust + WASM**)
- Supports:
  - **PNG Data URL** (simple usage)
  - **PNG raw bytes** (best performance, no Base64 overhead)
- Works out of the box with:
  - Plain HTML / JavaScript
  - React
  - Next.js (Pages Router & App Router)
  - Modern bundlers (Vite, Webpack, etc.)

---

## Installation

```bash
npm install @wirunrom/hqr-generate
```

## Basic Usage (Bundler / React / Next.js)

**Generate PNG Data URL**

Simple and widely compatible. Recommended for most use cases.

```ts
import { qrPngDataUrl } from "@wirunrom/hqr-generate";

const src = await qrPngDataUrl("hello world", {
  size: 320,
  margin: 4,
  ecc: "Q",
});

<img src={src} alt="QR Code" />
```

**Generate PNG Bytes (Best Performance)**

Using raw bytes avoids Base64 overhead and is more memory-efficient.

```ts
import { qrPngBytes } from "@wirunrom/hqr-generate";

const bytes = await qrPngBytes("hello world", {
  size: 320,
  margin: 4,
  ecc: "Q",
});

const url = URL.createObjectURL(
  new Blob([bytes], { type: "image/png" })
);

<img src={url} alt="QR Code" />

```

## React Hook Helper (/react)

For React or Next.js applications, the library provides idiomatic React hooks that automatically update when inputs change.

**useQrPngDataUrl**

Generates a PNG Data URL and updates automatically when dependencies change.

```ts
import { useQrPngDataUrl } from "@wirunrom/hqr-generate/react";

function QR() {
  const src = useQrPngDataUrl("hello world", {
    size: 320,
    margin: 4,
    ecc: "Q",
  });

  if (!src) return null;
  return <img src={src} alt="QR Code" />;
}
```

**useQrPngBlobUrl**

Generates a Blob URL instead of a Base64 Data URL.
Recommended for larger QR codes or frequent updates.

```ts
import { useQrPngBlobUrl } from "@wirunrom/hqr-generate/react";

function QR() {
  const src = useQrPngBlobUrl("hello world", {
    size: 320,
    margin: 4,
    ecc: "Q",
  });

  if (!src) return null;
  return <img src={src} alt="QR Code" />;
}
```

## Plain HTML / No Bundler (/web)

Use this entry when working with static HTML, CDN, or environments without a bundler.

```html
<script type="module">
  import { qr_png_bytes, qr_png_data_url } from "@wirunrom/hqr-generate/web";

  const src = await qr_png_bytes("hello world", {
    size: 320,
    margin: 4,
    ecc: "Q",
  });

  // or

  const src = await qr_png_data_url("hello world", {
    size: 320,
    margin: 4,
    ecc: "Q",
  });

  document.getElementById("qr").src = src;
</script>

<img id="qr" />
```

## API Reference

Generate a QR code and return a PNG Data URL.

| Name   | Type                       | Default | Description                  |
| ------ | -------------------------- | ------- | ---------------------------- |
| text   | `string`                   | —       | Text to encode               |
| size   | `number`                   | `320`   | Image size in pixels         |
| margin | `number`                   | `4`     | Quiet zone (recommended ≥ 4) |
| ecc    | `"L" \| "M" \| "Q" \| "H"` | `"Q"`   | Error correction level       |
