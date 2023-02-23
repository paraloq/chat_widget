import type { InjectionKey } from 'vue';
import type { Injection } from '../components/ChatWidget.ce.vue';
export declare function devHost(endpoint: 'initiate' | 'appearance'): string;
export declare function prepareMessage(data: string): string;
export declare const appearance: InjectionKey<Injection>;
