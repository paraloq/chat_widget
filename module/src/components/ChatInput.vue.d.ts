declare const _sfc_main: import("vue").DefineComponent<{
    isLoading: {
        type: BooleanConstructor;
        required: true;
    };
}, {
    props: any;
    emit: (e: 'send', message: string) => void;
    messageInput: import("vue").Ref<string>;
    provided: import("./ChatWidget.ce.vue").Injection;
    textarea: import("vue").Ref<HTMLTextAreaElement>;
    maybeSend: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "send"[], "send", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    isLoading: {
        type: BooleanConstructor;
        required: true;
    };
}>> & {
    onSend?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
