// @ts-check
/// <reference path="node_modules/@prettier/plugin-pug/src/prettier.d.ts" />

/**
 * @type {import('prettier').Options}
 */
module.exports = {
  plugins: [
    require.resolve('@prettier/plugin-pug'),
    require.resolve('prettier-plugin-organize-imports'),
  ],

  singleQuote: true,

  pugFramework: 'vue',
  pugSingleQuote: false,
  pugSortAttributesBeginning: [
    '^v-for$',
    '^:key$',
    '^v-if$',
    '^v-else-if$',
    '^v-else$',
    '^v-on$',
    '^v-bind$',
    '^ref$',
    '^v-model',
    '^name$',
    '^:?type$',
    '^:value$',
    '^v-text$',
    '^:?label$',
    '^:?src$',
  ],
  pugSortAttributesEnd: ['^@click', '^@'],
};
