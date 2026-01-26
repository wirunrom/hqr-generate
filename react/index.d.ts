import type { QrEcc } from "../index";

export interface UseQrPngOptions {
  size?: number;
  margin?: number;
  ecc?: QrEcc;
}

export * from "./useQrPngDataUrl";
export * from "./useQrPngBlobUrl";
export * from "./useQrDecodeFromImageData";
export * from "./useQrDecodeFromImageSrc";
