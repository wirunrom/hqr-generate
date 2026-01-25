import { useEffect, useState } from "react";
import { qr_decode_from_image_data } from "../index.web.js";

/**
 * React hook for decoding QR code from ImageData.
 *
 * @param {ImageData | null} image
 * @returns {{ text: string | null, error: unknown | null, loading: boolean }}
 */
export function useQrDecodeFromImageData(image) {
  const [text, setText] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;

    if (!image) {
      setText(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    qr_decode_from_image_data(image)
      .then((res) => {
        if (!alive) return;
        setText(res);
        setLoading(false);
      })
      .catch((err) => {
        if (!alive) return;
        setText(null);
        setError(err);
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [image]);

  return { text, error, loading };
}
