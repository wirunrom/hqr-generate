"use client";
import { useEffect, useState } from "react";
import { decode } from "../index.web.js";
export function useDecode(input) {
    const [text, setText] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!input)
            return;
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const result = await decode(input);
                if (!cancelled)
                    setText(result);
            }
            catch (e) {
                if (!cancelled)
                    setError(e);
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [input]);
    return { text, error, loading };
}
