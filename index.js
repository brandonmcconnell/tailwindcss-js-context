const plugin = require('tailwindcss/plugin');

module.exports = plugin.withOptions(function (options = {}) {
  return function ({ matchUtilities, theme, config }) {
    const context = {
      theme,
      config,
      ...(options ?? {}),
    }
    matchUtilities({
      js: (value) => {
        const escape = (str) => {
          console.log(`escaping \`${str}\``)
          return str.replace(/_/g, '\\_').replace(/ /g, '_')
        }

        const unescape = (str) => {
          console.log(`unescaping \`${str}\``)
          str = str.replace(/(?<!\\)_/g, ' ')
          str = str.replace(/\\_/g, '_')
          return str
        }

        const parseString = (str) => {
          console.log(`parsing \`${str}\``)
          return str.split(/(#{.*?})/g).map((el, i) => (i % 2 === 1 ? el.slice(2, -1) : el))
        }

        const parts = parseString(escape(value))

        const utility = parts
          .map((part, i) => {
            if (i % 2 === 0) {
              return part
            } else {
              const args = Object.keys(context)
              const values = Object.values(context)
              const func = new Function(...args, `return ${unescape(part)};`)
              return escape(`${func(...values)}`)
            }
          })
          .join('')

        return {
          [`@apply ${utility}`]: {},
        }
      },
    })
  }
});
