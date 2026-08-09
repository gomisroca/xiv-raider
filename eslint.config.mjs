import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Build / generated output
    '.next/**',
    'dist/**',
    'coverage/**',
    'node_modules/**',
    'e2e/**',
    'generated/**',

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
  {
    settings: {
      // Fix for ESLint 10+: eslint-plugin-react uses context.getFilename() (legacy API)
      // which was removed in ESLint 10 flat config. Declaring the version explicitly
      // prevents the plugin from trying to auto-detect it and failing.
      react: { version: '19' },
    },
  },
]);

export default eslintConfig;
