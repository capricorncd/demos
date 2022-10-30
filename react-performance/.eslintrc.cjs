/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/07 23:02:43 (GMT+0900)
 */
module.exports = {
  root: true,
  env: { browser: true, node: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:react/recommended',
    // 'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'never',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true }, // 大文字小文字関係なくアルファベット順にしたい
        pathGroups: [
          // { "pattern": "assets/**", "group": "internal", "position": "before" },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: { project: './tsconfig.json' },
    },
  },
};
