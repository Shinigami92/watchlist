module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    '@vue/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'grouped-accessor-pairs': ['warn', 'getBeforeSet'],
    'linebreak-style': ['error', 'unix'],
    'max-classes-per-file': 'error',
    'max-len': ['warn', { code: 120 }],
    'no-case-declarations': 'warn',
    'no-constant-condition': 'error',
    'no-shadow': 'warn',
    'no-unused-expressions': 'error',
    'no-useless-concat': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', { avoidEscape: true }],

    // Cant resolve module.exports = ...
    // https://github.com/benmosher/eslint-plugin-import/issues/1145
    'import/default': 'warn',

    'import/no-unresolved': 'error',

    // Cant resolve types
    // https://github.com/benmosher/eslint-plugin-import/issues/1341
    'import/named': 'off',

    // 'sort-imports': 'warn',
    // 'import/order': ['warn'],

    // TODO christopher 2019-09-20: Use this rule
    'max-lines': ['off', 400],

    // TODO christopher 2019-09-20: Use this rule
    // camelcase: 'error',

    // TODO christopher 2019-09-20: Rule should behave like variable-name -> ban-keywords
    // 'id-blacklist': [
    //    'error',
    //    'any',
    //    'Number',
    //    'number',
    //    'String',
    //    'string',
    //    'Boolean',
    //    'boolean',
    //    'Undefined',
    //    'undefined'
    // ],

    semi: ['off'],
    '@typescript-eslint/semi': ['error'],
    indent: ['off', 2],
    '@typescript-eslint/indent': ['off', 2],

    '@typescript-eslint/array-type': ['warn', { default: 'array-simple', readonly: 'generic' }],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    // TODO christopher 2020-01-24: Waiting on https://github.com/typescript-eslint/typescript-eslint/issues/929
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: [
          'signature',

          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'static-field',

          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'static-method',

          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',

          'public-abstract-field',
          'protected-abstract-field',
          'private-abstract-field',

          'public-field',
          'protected-field',
          'private-field',
          'instance-field',
          'abstract-field',
          'field',

          'constructor',

          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',

          'public-abstract-method',
          'protected-abstract-method',
          'private-abstract-method',

          'public-method',
          'protected-method',
          'private-method',

          'instance-method',
          'abstract-method',

          'method'
        ]
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off', // TODO christopher 2019-09-20: Use this rule
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'off', // TODO christopher 2020-04-14: Enable with TS 3.9
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/typedef': [
      'warn',
      {
        arrowParameter: false,
        memberVariableDeclaration: true,
        objectDestructuring: false, // TODO christopher 2019-09-20: Currently in conflict with `arrowParameter: false`
        parameter: false, // TODO christopher 2019-09-20: Should later be set to true
        propertyDeclaration: true,
        variableDeclaration: true
      }
    ]

    /*
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md
     *
     * Missing TSLint rules:
     * - strict-type-predicates
     */
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {}
    }
  }
};
