declare const _sfc_main: import("vue").DefineComponent<{}, {
    emit: {
        (e: 'clear'): void;
        (e: 'close'): void;
        (e: 'openSetting'): void;
    };
    provided: import("./ChatWidget.ce.vue").Injection;
    LogoGlobal: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("clear" | "close" | "openSetting")[], "clear" | "close" | "openSetting", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onClear?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onOpenSetting?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
