import plugin from 'tailwindcss/plugin';
export default plugin.withOptions(function (options = {}) {
    return function ({ matchUtilities, theme, config }) {
        const context = {
            theme,
            config,
            ...(options !== null && options !== void 0 ? options : {}),
        };
        matchUtilities({
            js: (value) => {
                const escape = (str) => {
                    return str.replace(/_/g, '\\_').replace(/ /g, '_');
                };
                const unescape = (str) => {
                    return str.replace(/(?<!\\)_/g, ' ').replace(/\\_/g, '_');
                };
                const parseString = (str) => {
                    return str.split(/(#{.*?})/g).map((el, i) => (i % 2 === 1 ? el.slice(2, -1) : el));
                };
                const parts = parseString(escape(value));
                const utility = parts
                    .map((part, i) => {
                    if (i % 2 === 0) {
                        return part;
                    }
                    else {
                        const args = Object.keys(context);
                        const values = Object.values(context);
                        const func = new Function(...args, `return ${unescape(part)};`);
                        return escape(`${func(...values)}`);
                    }
                })
                    .join('');
                return {
                    [`@apply ${utility}`]: {},
                };
            },
        });
    };
});
