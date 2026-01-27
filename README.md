# @wirunrom/hqr-generate

A high-performance **QR Code generator and decoder**
focused on **maximum scan reliability** and a **binary-first design**,
powered by **Rust + WebAssembly (WASM)**.

This library intentionally keeps its core **simple, fast, and environment-agnostic**.

---

## Design Philosophy

This library follows a **byte-first architecture**:

- Core APIs always return **raw binary (`Uint8Array`)**
- No Base64 or Data URL generation in the core
- Rendering is handled at the **UI / presentation layer**
- Works consistently across:
  - Browser
  - React
  - Next.js (Client & Server Components)
  - Node.js (SSR / API routes)

This design ensures:

- Better performance
- Lower memory usage
- Clean separation between data and presentation
- Predictable behavior across environments

---

## Features

- High-contrast **black & white only** QR codes  
  (scan reliability first)
- Deterministic and consistent output
- **Raw PNG bytes (`Uint8Array`)** generation
- **SVG output** for resolution-independent rendering
- QR decoding from:
  - `Uint8Array`
  - Browser `ImageData`
- Optimized for:
  - React
  - Next.js (App Router & SSR)
  - Plain HTML / JavaScript
- Lightweight and fast (Rust + WASM)

---

## Installation

```bash
npm install @wirunrom/hqr-generate
```

## API Reference

| Function                       | Parameters                                    | Returns                           |
| ------------------------------ | --------------------------------------------- | --------------------------------- |
| `generate(text, options?)`     | `text: string`<br>`options?: GenerateOptions` | `Promise<Uint8Array>` (PNG bytes) |
| `generate_svg(text, options?)` | `text: string`<br>`options?: GenerateOptions` | `Promise<string>` (SVG markup)    |
| `decode(input)`                | `input: Uint8Array \| ImageData`              | `Promise<string>` (decoded text)  |

### GenerateOptions

| Option   | Type                       | Default | Description                   |
| -------- | -------------------------- | ------- | ----------------------------- |
| `size`   | `number`                   | `320`   | Output image size (px)        |
| `margin` | `number`                   | `4`     | Quiet zone / margin (modules) |
| `ecc`    | `'L' \| 'M' \| 'Q' \| 'H'` | `'Q'`   | Error correction level        |

### Notes

- All generate APIs return **raw data**, not Base64 or Data URLs.
- PNG output is returned as **binary bytes (`Uint8Array`)**.
- SVG output is returned as **plain string markup**.

---

## Client-side Usage (Recommended)

When rendering QR codes in the browser or a Client Component,
use the React hook provided by the `/react` entry.

The hook automatically:

- Calls the core API
- Converts binary data to a `Blob URL`
- Handles cleanup (`URL.revokeObjectURL`)

```tsx
"use client";

import { useGenerate } from "@wirunrom/hqr-generate/react";

export default function QR() {
  const { src, loading } = useGenerate("hello world", {
    size: 320,
    ecc: "Q",
  });

  if (loading) return <p>Loading…</p>;
  return <img src={src ?? ""} alt="QR Code" />;
}
```

Internally, the hook performs:

```
Uint8Array → Blob → blob: URL
```

---

## Next.js SSR / Route Handlers

When generating QR codes on the server,
the API returns raw PNG bytes.

```ts
import { generate } from "@wirunrom/hqr-generate";

export async function GET() {
  const bytes = await generate("hello ssr");

  return new Response(bytes, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=60",
    },
  });
}
```

No Base64 conversion is required.

---

## SSR → Client Rendering

If you generate QR codes on the server
but render them on the client:

1. Generate bytes on the server
2. Convert bytes to a `Blob` on the client

```tsx
// Server Component
import { generate } from "@wirunrom/hqr-generate";
import ClientQr from "./ClientQr";

export default async function Page() {
  const bytes = await generate("hello ssr");
  return <ClientQr bytes={bytes} />;
}
```

```tsx
// Client Component
"use client";

import { useEffect, useState } from "react";

export default function ClientQr({ bytes }: { bytes: Uint8Array }) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const blob = new Blob([bytes], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [bytes]);

  return <img src={src} alt="QR Code" />;
}
```

---

## Plain HTML / Vanilla JavaScript Usage

The library can be used directly in **plain HTML** using ES Modules.
No framework or build tool is required.

> Note: The example assumes you are serving files over HTTP
> (do not open the file via `file://`), because WASM requires HTTP.

---

### Generate QR Code (PNG)

```html
<!doctype html>
<html lang="en">
  <body>
    <h3>Generate PNG QR</h3>

    <input id="text" value="hello world" />
    <button id="btn">Generate</button>

    <br /><br />
    <img id="img" />

    <script type="module">
      import { generate } from "https://esm.sh/@wirunrom/hqr-generate";

      const btn = document.getElementById("btn");
      const img = document.getElementById("img");
      const input = document.getElementById("text");

      btn.onclick = async () => {
        const bytes = await generate(input.value, {
          size: 256,
          ecc: "Q",
        });

        const blob = new Blob([bytes], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        img.src = url;
      };
    </script>
  </body>
</html>
```

---

### Generate QR Code (SVG)

```html
<!doctype html>
<html lang="en">
  <body>
    <h3>Generate SVG QR</h3>

    <input id="text" value="hello world" />
    <button id="btn">Generate</button>

    <br /><br />
    <div id="svg"></div>

    <script type="module">
      import { generate_svg } from "https://esm.sh/@wirunrom/hqr-generate";

      const btn = document.getElementById("btn");
      const input = document.getElementById("text");
      const container = document.getElementById("svg");

      btn.onclick = async () => {
        const svg = await generate_svg(input.value, {
          size: 256,
          ecc: "Q",
        });

        container.innerHTML = svg;
      };
    </script>
  </body>
</html>
```

---

### Decode QR Code

```html
<!doctype html>
<html lang="en">
  <body>
    <h3>Decode QR</h3>

    <input type="file" id="file" accept="image/*" />
    <p id="result"></p>

    <script type="module">
      import { decode } from "https://esm.sh/@wirunrom/hqr-generate";

      const fileInput = document.getElementById("file");
      const result = document.getElementById("result");

      fileInput.onchange = async () => {
        const file = fileInput.files?.[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const text = await decode(imageData);

          result.textContent = `Decoded text: ${text}`;
        };
      };
    </script>
  </body>
</html>
```

---

## What This Library Does NOT Do

- ❌ No Base64 or Data URL generation in the core
- ❌ No JPG / WebP / GIF rendering
- ❌ No DOM or framework-specific logic outside `/react`

---

## Summary

- Core → returns `Uint8Array`
- React hooks → handle `Blob` conversion
- SSR → returns raw bytes or `Response`
- Client → renders via `blob:` URL

> Keep data binary.
> Convert only at the UI boundary.
