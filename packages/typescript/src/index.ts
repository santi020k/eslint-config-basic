import tsEslint from 'typescript-eslint'

import { standardRules, typeCheckedRules } from './rules.js'

import { GLOB_SLOT, GLOB_TS, GLOB_VIRTUAL_TS } from '@santi020k/eslint-config-core'
import tsParser from '@typescript-eslint/parser'
import type { TSESLint } from '@typescript-eslint/utils'

const typedFiles = [...GLOB_TS, ...GLOB_SLOT]
const typeCheckedFiles = [...GLOB_TS, ...GLOB_SLOT, ...GLOB_VIRTUAL_TS]
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
        parser: tsParser,
        projectService: true,
        extraFileExtensions: ['.astro', '.svelte', '.vue'],
        tsconfigRootDir: options.tsconfigRootDir
      }
    }
  },
  ...(tsEslint.configs.strictTypeChecked as TSESLint.FlatConfig.ConfigArray).flatMap(c => [
    {
      ...c,
      files: GLOB_TS,
      ignores: [...(c.ignores ?? []), ...virtualTypeCheckedFiles]
    },
    ...(c.rules ?
      [
        {
          name: `${c.name ?? 'ts-strict'}/rules-only`,
          files: [...GLOB_SLOT, ...GLOB_VIRTUAL_TS],
          rules: c.rules
        }
      ] :
      [])
  ]),
  ...(tsEslint.configs.stylisticTypeChecked as TSESLint.FlatConfig.ConfigArray).flatMap(c => [
    {
      ...c,
      files: GLOB_TS,
      ignores: [...(c.ignores ?? []), ...virtualTypeCheckedFiles]
    },
    ...(c.rules ?
      [
        {
          name: `${c.name ?? 'ts-stylistic'}/rules-only`,
          files: [...GLOB_SLOT, ...GLOB_VIRTUAL_TS],
          rules: c.rules
        }
      ] :
      [])
  ]),
  {
    name: 'eslint-config-typescript/parser-setup',
    files: GLOB_TS,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.astro', '.svelte', '.vue'],
        tsconfigRootDir: options.tsconfigRootDir
      },
      ecmaVersion: 'latest'
    }
  },
  {
    name: 'eslint-config-typescript/standard-rules',
    files: typedFiles,
    rules: standardRules
  },
  {
    name: 'eslint-config-typescript/type-checked-rules',
    files: typeCheckedFiles,
    rules: typeCheckedRules
  }
]

export const typescriptConfig = createTypescriptConfig()

// Legacy export for backwards compatibility
export { typescriptConfig as tsConfig }

// Re-export rules for direct access
export { standardRules, typeCheckedRules }

export default typescriptConfig
