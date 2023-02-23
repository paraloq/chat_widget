declare const _sfc_main: import("vue").DefineComponent<{
    isOpen: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
}, {
    props: any;
    emit: (e: 'toggle') => void;
    provided: import("./ChatWidget.ce.vue").Injection;
    cssClasses: import("vue").ComputedRef<string[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "toggle"[], "toggle", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    isOpen: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
}>> & {
    onToggle?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
