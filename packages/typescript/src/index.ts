import { existsSync } from 'node:fs'

import { GLOB_SLOT, GLOB_TS, GLOB_VIRTUAL_TS } from '@santi020k/eslint-config-core'

import tsParser from '@typescript-eslint/parser'
import type { TSESLint } from '@typescript-eslint/utils'
import tsEslint from 'typescript-eslint'

import { standardRules, typeCheckedRules } from './rules.js'

const typedFiles = [...GLOB_TS, ...GLOB_SLOT]
const typeCheckedFiles = [...GLOB_TS, ...GLOB_SLOT, ...GLOB_VIRTUAL_TS]
const virtualTypeCheckedFiles = GLOB_VIRTUAL_TS

type TypeScriptMode = 'off' | 'strict' | 'syntax' | 'type-aware'

const strictModeRules: TSESLint.Linter.RulesRecord = {
  '@typescript-eslint/consistent-type-imports': ['error', {
    fixStyle: 'inline-type-imports',
    prefer: 'type-imports'
  }],
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unsafe-call': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'error',
  '@typescript-eslint/no-unsafe-return': 'error'
}

interface CreateTypescriptConfigOptions {
  mode?: Exclude<TypeScriptMode, 'off'>
  project?: boolean | string | string[]
  projectService?: boolean
  tsconfigRootDir?: string
}

const mapRulesToSlots = (
  config: TSESLint.FlatConfig.Config,
  fallbackName: string
): TSESLint.FlatConfig.ConfigArray => [
  {
    ...config,
    files: GLOB_TS,
    ignores: [...(config.ignores ?? []), ...virtualTypeCheckedFiles]
  },
  ...(config.rules ?
    [
      {
        files: [...GLOB_SLOT, ...GLOB_VIRTUAL_TS],
        name: `${config.name ?? fallbackName}/rules-only`,
        rules: config.rules
      }
    ] :
    [])
]

const resolveProjectOptions = (options: CreateTypescriptConfigOptions, mode: string) => {
  const projectService = options.projectService ?? (mode !== 'syntax' && options.project === undefined)
  const project = options.project ?? (mode !== 'syntax' && !projectService ? true : undefined)

  return { project, projectService }
}

const buildParserOptions = (
  project: CreateTypescriptConfigOptions['project'] | true,
  projectService: boolean,
  tsconfigRootDir: string | undefined
) => ({
  extraFileExtensions: ['.astro', '.svelte', '.vue'],
  parser: tsParser,
  ...(project === undefined ? {} : { project }),
  ...(projectService ? { projectService: true } : {}),
  tsconfigRootDir
})

/**
 * TypeScript ESLint configuration factory
 * Extends typescript-eslint strict + stylistic type-checked presets with custom rules
 *
 * @throws {Error} If `tsconfigRootDir` is provided but does not exist on disk.
 */
export const createTypescriptConfig = (
  options: CreateTypescriptConfigOptions = {}
): TSESLint.FlatConfig.ConfigArray => {
  if (options.tsconfigRootDir && !existsSync(options.tsconfigRootDir)) {
    throw new Error(
      `[eslint-config-typescript] tsconfigRootDir does not exist: "${options.tsconfigRootDir}". ` +
      'Make sure the path is absolute and points to the directory containing your tsconfig.json.'
    )
  }

  const mode = options.mode ?? 'type-aware'
  const { project, projectService } = resolveProjectOptions(options, mode)
  const parserOptions = buildParserOptions(project, projectService, options.tsconfigRootDir)

  const baseConfigs = mode === 'syntax' ?
    [
      ...(tsEslint.configs.strict as TSESLint.FlatConfig.ConfigArray),
      ...(tsEslint.configs.stylistic as TSESLint.FlatConfig.ConfigArray)
    ] :
    [
      ...(tsEslint.configs.strictTypeChecked as TSESLint.FlatConfig.ConfigArray),
      ...(tsEslint.configs.stylisticTypeChecked as TSESLint.FlatConfig.ConfigArray)
    ]

  return [
    {
      files: typedFiles,
      languageOptions: {
        parserOptions
      },
      name: 'eslint-config-typescript/setup',
      plugins: {
        '@typescript-eslint': tsEslint.plugin
      }
    },
    ...baseConfigs.flatMap(c => mapRulesToSlots(c, `ts-${mode}`)),
    {
      files: GLOB_TS,
      languageOptions: {
        ecmaVersion: 'latest',
        parser: tsParser,
        parserOptions
      },
      name: 'eslint-config-typescript/parser-setup'
    },
    {
      files: typedFiles,
      name: 'eslint-config-typescript/standard-rules',
      rules: standardRules
    },
    ...(mode === 'syntax' ?
      // Explicitly disable all type-aware rules so that syntax mode properly overrides
      // a parent type-aware config when used inside `projects: { 'pkg': { typescript: 'syntax' } }`.
      mapRulesToSlots(
        { ...tsEslint.configs.disableTypeChecked as TSESLint.FlatConfig.Config, name: 'eslint-config-typescript/disable-type-checked' },
        'ts-syntax-disable-type-checked'
      ) :
      [{
        files: typeCheckedFiles,
        name: 'eslint-config-typescript/type-checked-rules',
        rules: typeCheckedRules
      }]
    ),
    ...(mode === 'strict' ?
      [{
        files: typedFiles,
        name: 'eslint-config-typescript/strict-mode-rules',
        rules: strictModeRules
      }] :
      [])
  ]
}

export const typescriptConfig = createTypescriptConfig()

// Legacy export for backwards compatibility
export { typescriptConfig as tsConfig }

// Re-export rules for direct access
export { standardRules, typeCheckedRules }

export default typescriptConfig
