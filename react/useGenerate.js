"use client";
import { useEffect, useState } from "react";
import { generate } from "../index.web.js";
function toArrayBuffer(bytes) {
    if (bytes.buffer instanceof ArrayBuffer) {
        return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    }
    return Uint8Array.from(bytes).buffer;
}
export function useGenerate(text, opts) {
    const [bytes, setBytes] = useState(null);
    const [src, setSrc] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!text)
            return;
        let cancelled = false;
        let objectUrl = null;
        (async () => {
            try {
                setLoading(true);
                const result = await generate(text, opts);
                if (cancelled)
                    return;
                setBytes(result);
                const buffer = toArrayBuffer(result);
                const blob = new Blob([buffer], { type: "image/png" });
                objectUrl = URL.createObjectURL(blob);
                setSrc(objectUrl);
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
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [text, opts]);
    return {
        src,
        bytes,
        error,
        loading,
    };
}
