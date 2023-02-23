declare const _sfc_main: import("vue").DefineComponent<{
    products: {
        type: ArrayConstructor;
        required: true;
    };
}, {
    props: any;
    emit: (e: 'scrollTo', itemId: string) => void;
    provided: import("./ChatWidget.ce.vue").Injection;
    recommend: (productUrl: string, itemId: string) => void;
    hideShadow: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "scrollTo"[], "scrollTo", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    products: {
        type: ArrayConstructor;
        required: true;
    };
}>> & {
    onScrollTo?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
