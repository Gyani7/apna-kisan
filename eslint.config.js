const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const nextPlugin = require('@next/eslint-plugin-next');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');

module.exports = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      '@next/next': nextPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      "@next/next/no-img-element": "off",
    },
  },
];