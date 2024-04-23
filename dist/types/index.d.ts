type Options = Record<string, any>;
declare const _default: {
    (options: Options): {
        handler: import("tailwindcss/types/config").PluginCreator;
        config?: Partial<import("tailwindcss").Config> | undefined;
    };
    __isOptionsFunction: true;
};
export default _default;
