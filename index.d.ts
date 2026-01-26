/* =========================================================
 * Types
 * ======================================================= */

export type QrEcc = "L" | "M" | "Q" | "H";

export interface GenerateOptions {
  /**
   * Output image size (px)
   * @default 320
   */
  size?: number;

  /**
   * Quiet zone / margin (modules)
   * @default 4
   */
  margin?: number;

  /**
   * Error correction level
   * @default "Q"
   */
  ecc?: QrEcc;
}

/* =========================================================
 * Generate (Encode)
 * ======================================================= */

/**
 * Generate QR code (PNG, fastest & default)
 */
export function generate(
  text: string,
  opts?: GenerateOptions
): Promise<Uint8Array> | Uint8Array;

/**
 * Generate QR code as PNG
 */
export function generate_png(
  text: string,
  opts?: GenerateOptions
): Promise<Uint8Array> | Uint8Array;

/**
 * Generate QR code as SVG
 */
export function generate_svg(
  text: string,
  opts?: GenerateOptions
): Promise<string> | string;

/**
 * Generate QR code as JPG
 */
export function generate_jpg(
  text: string,
  opts?: GenerateOptions
): Promise<Uint8Array> | Uint8Array;

/**
 * Generate QR code as WebP
 */
export function generate_webp(
  text: string,
  opts?: GenerateOptions
): Promise<Uint8Array> | Uint8Array;

/* =========================================================
 * Decode
 * ======================================================= */

/**
 * Decode QR code from image source
 *
 * Supported inputs:
 * - Uint8Array (PNG / JPG / WebP / etc.)
 * - ImageData (Browser / Canvas)
 */
export function decode(
  input: Uint8Array | ImageData
): Promise<string> | string;
