"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = __importDefault(require("tailwindcss/plugin"));
module.exports = plugin_1.default.withOptions(function (options = {}) {
    return function ({ matchUtilities, theme, config }) {
        const context = {
            theme,
            config,
            ...(options !== null && options !== void 0 ? options : {}),
        };
        matchUtilities({
            js: (value) => {
                const escape = (str) => {
                    console.log(`escaping \`${str}\``);
                    return str.replace(/_/g, '\\_').replace(/ /g, '_');
                };
                const unescape = (str) => {
                    console.log(`unescaping \`${str}\``);
                    str = str.replace(/(?<!\\)_/g, ' ');
                    str = str.replace(/\\_/g, '_');
                    return str;
                };
                const parseString = (str) => {
                    console.log(`parsing \`${str}\``);
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
