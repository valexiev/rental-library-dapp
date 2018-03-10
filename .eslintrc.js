// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // http://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': ['error', 'never'],
    // http://eslint.org/docs/rules/curly
    'curly': ['error', 'all'],
    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['error', 'always-multiline'],
    // https://eslint.org/docs/rules/no-multi-spaces
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
    // https://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxBOF': 1, 'maxEOF': 1 }]
  },
  'globals': {
    'debugger': true,
    'web3': true
  }
}
