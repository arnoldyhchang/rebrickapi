import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  {
    /* set rule to ignore css prop as ESLINT rule is not smart enough for emotion */
    rules: {
      "react/no-unknown-property": ["error", { "ignore": ["css"] }],
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
