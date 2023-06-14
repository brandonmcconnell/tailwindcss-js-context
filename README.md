<h1 align="center">JS Tool for Tailwind CSS</h1>

<div align="center">

[![minified size](https://img.shields.io/bundlephobia/min/jstool-for-tailwindcss)](https://bundlephobia.com/package/jstool-for-tailwindcss)
[![license](https://img.shields.io/github/license/brandonmcconnell/jstool-for-tailwindcss?label=license)](https://github.com/brandonmcconnell/jstool-for-tailwindcss/blob/main/LICENSE.txt)
[![version](https://img.shields.io/npm/v/jstool-for-tailwindcss)](https://www.npmjs.com/package/jstool-for-tailwindcss)
[![twitter](https://img.shields.io/twitter/follow/branmcconnell)](https://twitter.com/branmcconnell)

</div>

`jstool-for-tailwindcss` is a plugin for Tailwind CSS that introduces the `js` directive, a utility that allows you to evaluate JavaScript expressions within your utility classes. This provides a flexible, dynamic approach to defining your styles.

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Using Context Values](#using-context-values)
  - [Built-In Context Values](#built-in-context-values)
  - [Other (mostly random \& unrealistic) examples](#other-mostly-random--unrealistic-examples)
- [Why use `jstool-for-tailwindcss`](#why-use-jstool-for-tailwindcss)

## Installation

You can install the plugin via npm:

```bash
npm install jstool-for-tailwindcss
```

Then, include it in your `tailwind.config.js`:

```js
module.exports = {
  plugins: [
    require('jstool-for-tailwindcss'),
  ]
}
```

or if using a custom context object:

```js
module.exports = {
  plugins: [
    require('jstool-for-tailwindcss')({
      appName: 'My app',
      // ...other values
    }),
  ]
}
```

## Usage

The plugin provides a `js` directive, allowing you to use JavaScript expressions within your utility classes:

### Basic Usage

For a simple use case, you can use JavaScript expressions directly in your utility classes with the `js` directive:

```html
<div class="js-[content-['1_+_1_=_#{1+1}']]"></div>
```

This will output the following content: `1 + 1 = 2`

### Using Context Values

You can also use values from your context object within your utility classes:

```html
<div class="js-[content-['The_app_name_is_#{appName}']]"></div>
```

This will output the following content: `The app name is My app`

### Built-In Context Values

In addition to any custom values you pass in, the plugin also provides easy access to both the `theme` and `config` functions:

```html
<div class="before:js-[content-['fontSize.2xl_===_#{theme('fontSize.2xl')}']]"></div>
```

This will output the following content: `fontSize.2xl === 1.5rem`

Please note that all utilities are built at runtime, so in order for a one-off utility to be random or unique, the utility will need to be unique as well. One way to ensure this is the case—when needed—is to pass some sort of custom identifier to properly seed the utility.

### Other (mostly random & unrealistic) examples

```html
<!-- Displaying all registered config keys -->
<div class="before:js-[content-['the_registered_config_keys_are_#{Object.keys(config()).join(',_')}']]"></div>

<!-- Displaying a random digit using a function from the context object -->
<div class="before:js-[content-['A_random_digit_is_#{randomDigit()}']]"></div>

<!-- Using random colors for text and text shadow, once again using a custom function from the context object -->
<div class="js-[[--random-color:#{randomColor()}]] js-[[--random-color-2:#{randomColor()}]] text-[--random-color] font-semibold [text-shadow:1px_2px_0_var(--random-color-2)]">Random_colors_ftw!</div>

<!-- Using random length for text size -->
<div class="js-[[--random-length:#{randomRange(16,22)}px]] text-[length:--random-length]">Random sizes too 🤯</div>
```

All of these examples can also be seen and tested here on Tailwind Play: https://play.tailwindcss.com/ZID1xrVAra

## Why use `jstool-for-tailwindcss`

`jstool-for-tailwindcss` allows you to bring the power of JavaScript directly into your utility classes, enabling dynamic styles based on logic and state. This opens up endless possibilities for reactive design patterns.

This plugin is…

✨ GREAT for providing dynamic styles based on application state or logic 👏🏼

😬 NOT recommended for complex JavaScript expressions or application logic due to performance concerns 👀

---

I hope you find `jstool-for-tailwindcss` a valuable addition to your projects. If you have any issues or suggestions, don't hesitate to open an issue or pull request.

If you liked this, you might also like my other Tailwind CSS plugins:
* [multitool-for-tailwindcss](https://github.com/brandonmcconnell/multitool-for-tailwindcss): Group utilities together by variant
* [tailwind-lerp-colors](https://github.com/brandonmcconnell/tailwind-lerp-colors): Expand your color horizons and take the fuss out of genertaing new—or expanding existing—color palettes
* [tailwindcss-directional-shadows](https://github.com/brandonmcconnell/tailwindcss-directional-shadows): Supercharge your shadow utilities with added directional support (includes directional `shadow-border` utilities too ✨)