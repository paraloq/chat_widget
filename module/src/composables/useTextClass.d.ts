import type { MaybeRef } from '@vueuse/core';
import { type StyleValue } from 'vue';
export declare const useTextClass: (backgroundColor: MaybeRef<string>, cutoff?: number) => {
    textClass: "text-black" | "text-white";
    brightness: number;
    styleType: "backgroundColor" | "background";
    style: StyleValue | undefined;
    mainColor: string;
};
