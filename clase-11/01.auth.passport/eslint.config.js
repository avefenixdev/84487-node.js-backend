import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env: {
      node: true,
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn'],
    },
  },
];
