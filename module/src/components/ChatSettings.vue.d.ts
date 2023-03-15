declare const _sfc_main: import("vue").DefineComponent<{}, {
    emit: {
        (e: 'setLanguage', language: string): void;
        (e: 'close'): void;
    };
    provided: import("./ChatWidget.ce.vue").Injection;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "setLanguage")[], "close" | "setLanguage", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onSetLanguage?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
