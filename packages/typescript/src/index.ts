import tsEslint from 'typescript-eslint'

import { rules } from './rules.js'

import tsParser from '@typescript-eslint/parser'
import type { TSESLint } from '@typescript-eslint/utils'

const typedFiles = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']

const virtualTypeCheckedFiles = [
  '**/*.astro/*.{ts,tsx,mts,cts}',
  '*.astro/*.{ts,tsx,mts,cts}',
  '**/*.vue/*.{ts,tsx,mts,cts}',
  '*.vue/*.{ts,tsx,mts,cts}',
  '**/*.svelte/*.{ts,tsx,mts,cts}',
  '*.svelte/*.{ts,tsx,mts,cts}',
  '**/*.md/*.{ts,tsx,mts,cts}',
  '*.md/*.{ts,tsx,mts,cts}',
  '**/*.mdx/*.{ts,tsx,mts,cts}',
  '*.mdx/*.{ts,tsx,mts,cts}',
  '**/.vitepress/**/*.ts',
  '**/.vitepress/**/*.mts'
]

/**
 * TypeScript ESLint configuration factory
 * Extends typescript-eslint strict + stylistic type-checked presets with custom rules
 */
export const createTypescriptConfig = (
  options: { tsconfigRootDir?: string } = {}
): TSESLint.FlatConfig.ConfigArray => [
  ...(tsEslint.configs.strictTypeChecked as TSESLint.FlatConfig.ConfigArray).map(c => ({
    ...c,
    files: typedFiles
  })),
  ...(tsEslint.configs.stylisticTypeChecked as TSESLint.FlatConfig.ConfigArray).map(c => ({
    ...c,
    files: typedFiles
  })),
  {
    name: 'eslint-config-typescript/rules',
    files: typedFiles,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.astro', '.svelte', '.vue'],
        tsconfigRootDir: options.tsconfigRootDir
      },
      ecmaVersion: 'latest'
    },
    rules
  },
  {
    name: 'eslint-config-typescript/disable-type-checked',
    files: virtualTypeCheckedFiles,
    ...(tsEslint.configs.disableTypeChecked as TSESLint.FlatConfig.Config)
  }
]

export const typescriptConfig = createTypescriptConfig()

// Legacy export for backwards compatibility
export { typescriptConfig as tsConfig }

// Re-export rules for direct access
export { rules }

export default typescriptConfig
