import type { GenerateOptions } from "../index";
export declare function useGenerate(text?: string, opts?: GenerateOptions): {
    src: string | null;
    bytes: Uint8Array<ArrayBufferLike> | null;
    error: unknown;
    loading: boolean;
};
