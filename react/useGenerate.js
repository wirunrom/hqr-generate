"use client";
import { useCallback, useState } from "react";
import { generate } from "../index";
export function useGenerate() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const run = useCallback(async (text, opts) => {
        try {
            setLoading(true);
            const result = await generate(text, opts);
            setData(result);
            return result;
        }
        catch (e) {
            setError(e);
            throw e;
        }
        finally {
            setLoading(false);
        }
    }, []);
    return {
        data,
        error,
        loading,
        generate: run,
    };
}
