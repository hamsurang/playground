/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    es2020: true,
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@cspell/recommended',
  ],
  rules: {
    'no-warning-comments': 'warn',
    '@cspell/spellchecker': [
      'warn',
      {
        cspell: {
          words: ['hamsurang'],
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.spec.ts*', '*.test.ts*'],
      plugins: ['vitest', 'jest-dom'],
      extends: ['plugin:vitest/recommended'],
    },
  ],
}
