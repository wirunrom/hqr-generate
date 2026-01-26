import { useEffect, useState } from "react";
import { useQrDecodeFromImageData } from "./useQrDecodeFromImageData.js";

async function loadImageData(src) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export function useQrDecodeFromImageSrc(src) {
  const [imageData, setImageData] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!src) {
      setImageData(null);
      setLoadError(null);
      return;
    }

    let alive = true;

    loadImageData(src)
      .then((data) => {
        if (alive) {
          setImageData(data);
          setLoadError(null);
        }
      })
      .catch((err) => {
        if (alive) {
          setImageData(null);
          setLoadError(err);
        }
      });

    return () => {
      alive = false;
    };
  }, [src]);

  const decode = useQrDecodeFromImageData(imageData);

  return {
    ...decode,
    loadError,
  };
}
