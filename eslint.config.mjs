import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import storybook from 'eslint-plugin-storybook';
import vitest from '@vitest/eslint-plugin';
import tseslint from 'typescript-eslint';
import global from 'globals';

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    extends: [tseslint.configs.recommendedTypeChecked, tseslint.configs.stylisticTypeChecked],

    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },

    plugins: {
      prettier: prettierPlugin,
      vitest,
    },

    rules: {
      'prettier/prettier': 'error',

      'no-console': 'warn',

      '@typescript-eslint/array-type': 'off',

      '@typescript-eslint/consistent-type-definitions': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/require-await': 'off',

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  },

  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', '**/tests/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.vitest,
    },
  },

  ...storybook.configs['flat/recommended'],

  prettier,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'coverage/**', 'node_modules/**']),
]);
