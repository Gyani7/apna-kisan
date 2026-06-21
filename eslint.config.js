
const { FlatCompat } = require("@eslint/eslintrc");
const nxEslintPlugin = require("@nx/eslint-plugin");
const js = require("@eslint/js");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    plugins: {
      "@nx": nxEslintPlugin,
    },
  },
  ...compat.config({
    extends: [
      "plugin:@nx/typescript",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@next/next/recommended",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  }),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {},
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {},
  },
];
