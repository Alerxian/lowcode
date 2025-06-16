import eslint from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const frontendConfig = {
  files: ['apps/frontend/builder/**/*/.{ts,tsx,js,jsx}'],
  languageOptions: {
    ecmaVersion: 2022,
    globals: {
      ...globals.browser,
    },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}

const backendConfig = {
  files: ['apps/backend/**/*.{ts}'],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    parser: tseslint.parser,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'dist',
      'build',
      '**/*.js',
      '**/*.mjs',
      '**/*.d.ts',
      'eslint.config.ts',
      'commitlint.config.js',
      'test',
      '**/*.spec.ts',
    ],
  },
  frontendConfig,
  backendConfig,
  {
    plugins: {
      prettier: eslintPluginPrettier,
      'simple-import-sort': simpleSort,
    },
    rules: {
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
)
