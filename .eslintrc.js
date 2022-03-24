module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
    'react-native',
    'react-hooks'
  ],
  parser: '@babel/eslint-parser',
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
    'no-case-declarations': 'off',
    'react/no-unstable-nested-components': 'off',
    'comma-dangle': 'off',
    'prefer-const': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 'off',
    'react-native/no-single-element-style-arrays': 2,
  },
  globals: {
    fetch: false
  },
  parserOptions: {
    requireConfigFile: false
  }
};
