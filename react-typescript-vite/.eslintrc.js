/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-23 14:14 (GMT+0900)
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // parser: 'vue-eslint-parser',
  extends: [
    // 'plugin:vue/recommended',
    'prettier',
    'plugin:prettier/recommended',
    // 'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: [
    // 'vue',
    'react',
    'react-hooks',
    '@typescript-eslint'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      'jsx': true
    }
  },
  rules: {
    // TS不需要prop-types
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': [2, 'never'], // function 的圆括号之前是否使用空格
    'array-bracket-spacing': 2,
    'no-var': 2,
    'no-eval': 2,
    'arrow-spacing': 2,
    'block-spacing': 2,
    'key-spacing': 2,
    'brace-style': 2,
    camelcase: 2,
    'comma-dangle': [2, 'always-multiline'],
    eqeqeq: [2, 'always', { null: 'ignore' }],
    'object-curly-spacing': [2, 'always'],
    'nonblock-statement-body-position': 2, // if 语句后必须跟大括号
    // 'vue/max-attributes-per-line': [
    //   0,
    //   {
    //     singleline: 1,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false,
    //     },
    //   },
    // ],

    // 设置typescript-eslint规则
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none', // 'none' or 'semi' or 'comma'
          requireLast: true
        },
        singleline: {
          delimiter: 'semi', // 'semi' or 'comma'
          requireLast: false
        }
      }
    ],
    // '@typescript-eslint/interface-name-prefix': [2, { prefixWithI: 'always' }],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'] // 先忽略，但是尽量少用 any
  }
}
