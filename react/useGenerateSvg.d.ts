import type { GenerateOptions } from "../index";
export declare function useGenerateSvg(text?: string, opts?: GenerateOptions): {
    svg: string | null;
    error: unknown;
    loading: boolean;
};
