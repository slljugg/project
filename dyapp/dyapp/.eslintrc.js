module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'no-var': 'off',
    'no-alert': 'off',
    'consistent-return': 'off',
    'no-lonely-if': 'off',
    'no-unused-vars': 'off',
    'no-empty-function': 'off',
    'no-empty': 'off',
    'prefer-template': 'off',
    'quotes': 'off',
    'eqeqeq': 'off',
    'dot-notation': 'off',
  },
  settings: {
    'import/core-modules': ['video.js'],
  },
};
