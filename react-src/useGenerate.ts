"use client";

import { useCallback, useState } from "react";
import { generate } from "../index";
import type { GenerateOptions } from "../index";

export function useGenerate() {
  const [data, setData] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (text: string, opts?: GenerateOptions) => {
      try {
        setLoading(true);
        const result = await generate(text, opts);
        setData(result);
        return result;
      } catch (e) {
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    data,
    error,
    loading,
    generate: run,
  };
}
