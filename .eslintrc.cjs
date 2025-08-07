module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    defineEventHandler: 'readonly',
    createError: 'readonly',
    getQuery: 'readonly',
    readBody: 'readonly',
    useRuntimeConfig: 'readonly',
    $fetch: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Vue specific rules
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'error',
    'vue/no-unused-components': 'warn',

    // General rules
    'no-console': 'off', // Allow console statements for server-side logging
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
  },
}
