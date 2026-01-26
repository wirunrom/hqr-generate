"use client";

import { useEffect, useState } from "react";
import { generate_svg } from "../index";
import type { GenerateOptions } from "../index";

export function useGenerateSvg(
  text?: string,
  opts?: GenerateOptions
) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const result = await generate_svg(text, opts);
        if (!cancelled) setSvg(result);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [text, opts]);

  return { svg, error, loading };
}
