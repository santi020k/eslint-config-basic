import tsEslint from 'typescript-eslint'

import { standardRules, typeCheckedRules } from './rules.js'

import { GLOB_SLOT, GLOB_TS, GLOB_VIRTUAL_TS } from '@santi020k/eslint-config-core'
import tsParser from '@typescript-eslint/parser'
import type { TSESLint } from '@typescript-eslint/utils'

const typedFiles = [...GLOB_TS, ...GLOB_SLOT]
const typeCheckedFiles = GLOB_TS
const virtualTypeCheckedFiles = GLOB_VIRTUAL_TS

/**
 * TypeScript ESLint configuration factory
 * Extends typescript-eslint strict + stylistic type-checked presets with custom rules
 */
export const createTypescriptConfig = (
  options: { tsconfigRootDir?: string } = {}
): TSESLint.FlatConfig.ConfigArray => [
  {
    name: 'eslint-config-typescript/setup',
    files: typedFiles,
    plugins: {
      '@typescript-eslint': tsEslint.plugin
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.astro', '.svelte', '.vue'],
        tsconfigRootDir: options.tsconfigRootDir
      }
    }
  },
  ...(tsEslint.configs.strictTypeChecked as TSESLint.FlatConfig.ConfigArray).map(c => ({
    ...c,
    files: typeCheckedFiles,
    ignores: [...(c.ignores ?? []), ...virtualTypeCheckedFiles]
  })),
  ...(tsEslint.configs.stylisticTypeChecked as TSESLint.FlatConfig.ConfigArray).map(c => ({
    ...c,
    files: typeCheckedFiles,
    ignores: [...(c.ignores ?? []), ...virtualTypeCheckedFiles]
  })),
  {
    name: 'eslint-config-typescript/standard-rules',
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
    rules: standardRules
  },
  {
    name: 'eslint-config-typescript/type-checked-rules',
    files: typeCheckedFiles,
    ignores: virtualTypeCheckedFiles,
    rules: typeCheckedRules
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
export { standardRules, typeCheckedRules }

export default typescriptConfig
