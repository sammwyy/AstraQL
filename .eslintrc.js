module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json'],
  },
  ignorePatterns: ['.eslintrc.js', 'scripts/*', 'tsdx.config.js'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-mutable-exports': 0,
    'no-labels': 0,
    'no-restricted-syntax': 0,
    // no-plusplus should be allowed in for loop
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    // bitwise is definitely useful, especially when comes to flags
    // airbnb standards says nothing about bitwise
    'no-bitwise': 0,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    // important: not using prettier linting because there are conflicting lint with airbnb
  ],
};
