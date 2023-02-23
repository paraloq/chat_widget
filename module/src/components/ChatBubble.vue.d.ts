import type { Recommendation } from '../components/ChatWidget.ce.vue';
declare const _sfc_main: import("vue").DefineComponent<{
    message: {
        type: null;
        required: true;
    };
    date: {
        type: NumberConstructor;
        required: true;
    };
    isFirst: {
        type: BooleanConstructor;
        required: true;
    };
}, {
    props: any;
    emit: (e: 'openProducts', products: Recommendation[]) => void;
    provided: import('../components/ChatWidget.ce.vue').Injection;
    showTime: import("vue").ComputedRef<boolean>;
    time: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "openProducts"[], "openProducts", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    message: {
        type: null;
        required: true;
    };
    date: {
        type: NumberConstructor;
        required: true;
    };
    isFirst: {
        type: BooleanConstructor;
        required: true;
    };
}>> & {
    onOpenProducts?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
