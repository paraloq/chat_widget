declare const _sfc_main: import("vue").DefineComponent<{
    products: {
        type: ArrayConstructor;
        required: true;
    };
    scrollTo: {
        type: StringConstructor;
        required: false;
    };
}, {
    props: any;
    emit: {
        (e: 'closeProducts'): void;
        (e: 'close'): void;
    };
    provided: import("./ChatWidget.ce.vue").Injection;
    chatProducts: import("vue").Ref<HTMLDivElement | undefined>;
    recommend: (productUrl: string, itemId: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "closeProducts")[], "close" | "closeProducts", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    products: {
        type: ArrayConstructor;
        required: true;
    };
    scrollTo: {
        type: StringConstructor;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onCloseProducts?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
