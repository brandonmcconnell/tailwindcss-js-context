> [!IMPORTANT]
> `tailwindcss-js` has been renamed to `tailwindcss-js-context` to better reflect its purpose.

<h1 align="center">JS Context for Tailwind CSS</h1>

<div align="center">

[![minified size](https://img.shields.io/bundlephobia/min/tailwindcss-js-context)](https://bundlephobia.com/package/tailwindcss-js-context)
[![license](https://img.shields.io/github/license/brandonmcconnell/tailwindcss-js-context?label=license)](https://github.com/brandonmcconnell/tailwindcss-js-context/blob/main/LICENSE)
[![version](https://img.shields.io/npm/v/tailwindcss-js-context)](https://www.npmjs.com/package/tailwindcss-js-context)
[![twitter](https://img.shields.io/twitter/follow/branmcconnell)](https://twitter.com/branmcconnell)

</div>

`tailwindcss-js-context` is a plugin for Tailwind CSS that introduces the `js` directive, a utility that allows you to evaluate JavaScript expressions within your utility classes. This provides a flexible, dynamic approach to defining your styles.

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Using Context Values](#using-context-values)
  - [Built-In Context Values](#built-in-context-values)
  - [Other (mostly random \& unrealistic) examples](#other-mostly-random--unrealistic-examples)
- [Why use `tailwindcss-js-context`](#why-use-tailwindcss-js-context)
- [New syntax explanation](#new-syntax-explanation)

> [!WARNING]
> **Syntax change:** The value between the brackets in the `js` directive must now be quoted, due to a breaking change introduced in Tailwind CSS v3.3.6.
> ```
> ❌ js-[content-['1_+_1_=_#{1+1}']]
> ✅ js-['content-['1_+_1_=_#{1+1}']']
>        ^                          ^
> ```
> See the [New syntax explanation](#new-syntax-explanation) section for more information.

## Installation

You can install the plugin via npm:

```bash
npm install tailwindcss-js-context
```

Then, include it in your `tailwind.config.js`:

```js
module.exports = {
  plugins: [
    require('tailwindcss-js-context'),
  ]
}
```

or if using a custom context object:

```js
module.exports = {
  plugins: [
    require('tailwindcss-js-context')({
      // ...any values, e.g.
      appName: 'My app',
    }),
  ]
}
```

## Usage

The plugin provides a `js` directive, allowing you to use JavaScript expressions within your utility classes:

### Basic Usage

For a simple use case, you can use JavaScript expressions directly in your utility classes with the `js` directive:

```html
<div class="before:js-['content-['1_+_1_=_#{1+1}']']"></div>
```

This will output the following content: `1 + 1 = 2`

### Using Context Values

You can also use values from your context object within your utility classes:

```html
<div class="before:js-['content-['The_app_name_is_#{appName}']']"></div>
```

This will output the following content: `The app name is My app`

### Built-In Context Values

In addition to any custom values you pass in, the plugin also provides easy access to both the `theme` and `config` functions:

```html
<div class="before:js-['content-['fontSize.2xl_===_#{theme('fontSize.2xl')}']']"></div>
```

This will output the following content: `fontSize.2xl === 1.5rem`

Please note that all utilities are built at runtime, so in order for a one-off utility to be random or unique, the utility will need to be unique as well. One way to ensure this is the case—when needed—is to pass some sort of custom identifier to properly seed the utility.

### Other (mostly random & unrealistic) examples

```html
<!-- Checking equality of values -->
<div class="before:js-['content-['fontSize.2xl_===_#{theme('fontSize.2xl')}']']"></div>

<!-- Displaying all registered config keys -->
<div class="before:js-['content-['the_registered_config_keys_are_#{Object.keys(config()).join(',_')}']']"></div>

<!-- Displaying a random digit using a function from the context object -->
<div class="before:js-['content-['A_random_digit_is_#{randomDigit()}']']"></div>

<!-- Using random colors for text and text shadow, once again using a custom function from the context object -->
<div class="font-semibold text-[--random-color] js-['[--random-color-2:#{randomColor()}]'] js-['[--random-color:#{randomColor()}]'] [text-shadow:1px_2px_0_var(--random-color-2)]">Random_colors_ftw!</div>

<!-- Using random length for text size -->
<div class="text-[length:--random-length] js-['[--random-length:#{randomRange(16,22)}px]']">Random sizes too 🤯</div>
```
<sup>[View this example on Tailwind Play](https://play.tailwindcss.com/l4VSXZP2gd)</sup>

## Why use `tailwindcss-js-context`

`tailwindcss-js-context` allows you to bring the power of JavaScript directly into your utility classes, enabling dynamic styles based on logic and state. This opens up endless possibilities for reactive design patterns.

This plugin is…

✨ GREAT for providing dynamic styles based on application state or logic 👏🏼

😬 NOT recommended for complex JavaScript expressions or application logic due to performance concerns 👀

## New syntax explanation

```html
<!-- ❌ before -->
<div class="before:js-content-['1_+_1_=_#{1+1}']]"></div>

<!-- ✅ after -->
<div class="before:js-['content-['1_+_1_=_#{1+1}']']"></div>
```
<sup>[View a similar example on Tailwind Play](https://play.tailwindcss.com/SSN6P4Vcme)</sup>

The release of [Tailwind CSS v3.3.6](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.3.6) (on Dec 4, 2023) introduced breaking changes that made the original syntax of JS for Tailwind CSS incompatible with newer versions of Tailwind CSS.

See [tailwindlabs/tailwindcss#13473](https://github.com/tailwindlabs/tailwindcss/issues/13473) for the discussion that led to this new syntax.

This change required a slight tweak to the syntax of the `js` directive. Instead of `js-[...]`, use `js-['...']` (with a quoted value between the brackets) to pass the grouped utilities together as a string.

Versions of Tailwind CSS thereafter (v3.3.6+) are now incompatible with versions of the original unquoted syntax for this plugin (pre-v0.2.0). Update to `@latest` to ensure compatibility. This new version syntax is reverse-compatible with versions of Tailwind CSS prior to v3.3.6 as well.

Passing the joined strings together as a string allows the Tailwind CSS parser (again, in Tailwind CSS v3.3.6+) to see the value as a valid CSS value and process it as expected.

---

I hope you find `tailwindcss-js-context` a valuable addition to your projects. If you have any issues or suggestions, don't hesitate to open an issue or pull request.

If you liked this, you might also like my other Tailwind CSS plugins:
* [tailwindcss-multi](https://github.com/brandonmcconnell/tailwindcss-multi): Group utilities together by variant
* [tailwindcss-signals](https://github.com/brandonmcconnell/tailwindcss-signals): Apply styles based on parent or ancestor state, a state-driven alterative to groups
* [tailwindcss-members](https://github.com/brandonmcconnell/tailwindcss-members): Apply styles based on child or descendant state, the inverse of groups
* [tailwindcss-mixins](https://github.com/brandonmcconnell/tailwindcss-mixins): Construct reusable & aliased sets of utilities inline
* [tailwindcss-selector-patterns](https://github.com/brandonmcconnell/tailwindcss-selector-patterns): Dynamic CSS selector patterns
* [tailwindcss-directional-shadows](https://github.com/brandonmcconnell/tailwindcss-directional-shadows): Supercharge your shadow utilities with added directional support (includes directional `shadow-border` utilities too ✨)
* [tailwindcss-default-shades](https://github.com/brandonmcconnell/tailwindcss-default-shades): Default shades for simpler color utility classes
* [tailwind-lerp-colors](https://github.com/brandonmcconnell/tailwind-lerp-colors): Expand your color horizons and take the fuss out of generating new—or expanding existing—color palettes