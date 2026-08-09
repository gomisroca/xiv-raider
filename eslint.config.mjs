import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import storybook from 'eslint-plugin-storybook';
import vitest from '@vitest/eslint-plugin';
import tseslint from 'typescript-eslint';
import globals from 'globals';

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

  globalIgnores([
    // Build / generated output
    '.next/**',
    'dist/**',
    'coverage/**',
    'node_modules/**',

    // Generated / configuration files you don't want linted
    'src/vite-env.d.ts',
    'vite.config.ts',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'tsconfig.node.json',
    'tsconfig.app.json',

    // Components intentionally excluded from linting
    'src/app/_components/ui/**',

    // Prisma
    'prisma/**',

    // Static/public files
    'public/**',

    // Environment / deployment files
    '.env.example',
    '.dockerignore',
    'Dockerfile',
    'docker-compose.yml',

    // Project metadata / tooling
    'README.md',
    '.github/**',
    '.husky/**',
    '.prettierrc',
    '.prettierignore',
    '.gitignore',

    // Old ESLint configuration
    '.eslintrc.cjs',
    '.eslintrc',
    '.eslintignore',
  ]),
]);
