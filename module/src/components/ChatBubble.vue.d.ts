declare const _sfc_main: import("vue").DefineComponent<{
    message: {
        type: null;
        required: true;
    };
    timestamp: {
        type: NumberConstructor;
        required: true;
    };
    isFirst: {
        type: BooleanConstructor;
        required: true;
    };
}, {
    props: any;
    provided: import('../components/ChatWidget.ce.vue').Injection;
    showTime: import("vue").ComputedRef<boolean>;
    time: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    message: {
        type: null;
        required: true;
    };
    timestamp: {
        type: NumberConstructor;
        required: true;
    };
    isFirst: {
        type: BooleanConstructor;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
