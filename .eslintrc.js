module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    jasmine: true
  },
  // Specifies the ESLint parser
  parser: '@typescript-eslint/parser',
  extends: [
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/all'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },

  plugins: ['@typescript-eslint', 'unicorn', 'sonarjs'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-comment': [2, { 'ts-expect-error': false, 'ts-check': false }],
    'no-undef': ['error', { typeof: true }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'all',
        varsIgnorePattern: '^ignore$',
        argsIgnorePattern: '^ignore$'
      }
    ],
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-keyword-prefix': 'off',
    'unicorn/no-await-expression-member': 'off'
  },
  env: {
    jest: true,
    node: true
  }
}
