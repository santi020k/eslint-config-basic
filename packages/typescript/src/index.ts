import { existsSync } from 'node:fs'
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
 *
 * @throws {Error} If `tsconfigRootDir` is provided but does not exist on disk.
 */
export const createTypescriptConfig = (
  options: { tsconfigRootDir?: string } = {}
): TSESLint.FlatConfig.ConfigArray => {
  if (options.tsconfigRootDir && !existsSync(options.tsconfigRootDir)) {
    throw new Error(
      `[eslint-config-typescript] tsconfigRootDir does not exist: "${options.tsconfigRootDir}". ` +
      'Make sure the path is absolute and points to the directory containing your tsconfig.json.'
    )
  }

  return [
    {
      files: typedFiles,
      languageOptions: {
        parserOptions: {
          extraFileExtensions: ['.astro', '.svelte', '.vue'],
          parser: tsParser,
          projectService: true,
          tsconfigRootDir: options.tsconfigRootDir
        }
      },
      name: 'eslint-config-typescript/setup',
      plugins: {
        '@typescript-eslint': tsEslint.plugin
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
            files: [...GLOB_SLOT, ...GLOB_VIRTUAL_TS],
            name: `${c.name ?? 'ts-strict'}/rules-only`,
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
            files: [...GLOB_SLOT, ...GLOB_VIRTUAL_TS],
            name: `${c.name ?? 'ts-stylistic'}/rules-only`,
            rules: c.rules
          }
        ] :
        [])
    ]),
    {
      files: GLOB_TS,
      languageOptions: {
        ecmaVersion: 'latest',
        parser: tsParser,
        parserOptions: {
          extraFileExtensions: ['.astro', '.svelte', '.vue'],
          projectService: true,
          tsconfigRootDir: options.tsconfigRootDir
        }
      },
      name: 'eslint-config-typescript/parser-setup'
    },
    {
      files: typedFiles,
      name: 'eslint-config-typescript/standard-rules',
      rules: standardRules
    },
    {
      files: typeCheckedFiles,
      name: 'eslint-config-typescript/type-checked-rules',
      rules: typeCheckedRules
    }
  ]
}

export const typescriptConfig = createTypescriptConfig()

// Legacy export for backwards compatibility
export { typescriptConfig as tsConfig }

// Re-export rules for direct access
export { standardRules, typeCheckedRules }

export default typescriptConfig
