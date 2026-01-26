import type { GenerateOptions } from "../index";
export declare function useGenerate(): {
    data: Uint8Array<ArrayBufferLike> | null;
    error: unknown;
    loading: boolean;
    generate: (text: string, opts?: GenerateOptions) => Promise<Uint8Array<ArrayBufferLike>>;
};
