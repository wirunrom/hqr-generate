import type { QrEcc } from "../index";

export interface UseQrPngOptions {
  size?: number;
  margin?: number;
  ecc?: QrEcc;
}

export declare function useQrPngDataUrl(
  text: string,
  opts?: UseQrPngOptions
): string;

export declare function useQrPngBlobUrl(
  text: string,
  opts?: UseQrPngOptions
): string;

export declare function useQrDecodeFromImageData(
  image: ImageData | null
): {
  text: string | null;
  error: unknown | null;
  loading: boolean;
};

export declare function useQrDecodeFromImageSrc(
  src: string | null
): {
  text: string | null;
  loading: boolean;
  error: unknown | null;
  loadError: unknown | null;
};