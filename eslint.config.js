import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import tsEslint from 'typescript-eslint';
import { fixupPluginRules } from '@eslint/compat';

export default tsEslint.config(
  {ignores: ['dist']},
  {
    extends: [js.configs.recommended, ...tsEslint.configs.recommended],
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
    },
  },
);
