import { existsSync } from 'node:fs'

import { GLOB_SLOT, GLOB_SVELTE, GLOB_TS, GLOB_VIRTUAL_TS, GLOB_VUE } from '@santi020k/eslint-config-core'
import tsParser from '@typescript-eslint/parser'
import type { TSESLint } from '@typescript-eslint/utils'
import tsEslint from 'typescript-eslint'

import * as astroVirtualJsParser from './astro-virtual-js-parser.js'
import { standardRules, typeCheckedRules } from './rules.js'

const typedFiles = [...GLOB_TS, ...GLOB_SLOT]
const pluginSetupFiles = [...GLOB_TS, ...GLOB_SLOT, ...GLOB_VIRTUAL_TS]
const parserSetupFiles = [...GLOB_TS, ...GLOB_SVELTE, ...GLOB_VUE, ...GLOB_VIRTUAL_TS]
const parserSetupSlotFiles = [...GLOB_SVELTE, ...GLOB_VUE]
const typeCheckedFiles = typedFiles
const virtualTypeCheckedFiles = GLOB_VIRTUAL_TS
const DEFAULT_UNTYPED_FILES = ['**/*.config.{ts,mts,cts}']

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
  projectService?: boolean | {
    allowDefaultProject?: string[]
    defaultProject?: string
    loadTypeScriptPlugins?: boolean
    maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING?: number
  }
  tsconfigRootDir?: string
  untypedFiles?: false | string[]
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
        files: GLOB_SLOT,
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
  projectService: CreateTypescriptConfigOptions['projectService'],
  tsconfigRootDir: string | undefined
) => ({
  extraFileExtensions: ['.astro', '.svelte', '.vue'],
  parser: tsParser,
  ...(project === undefined ? {} : { project }),
  ...(projectService ? { projectService } : {}),
  tsconfigRootDir
})

const createUntypedFilesConfig = (
  files: false | string[] | undefined
): TSESLint.FlatConfig.ConfigArray => {
  if (files === false) return []

  const resolvedFiles = files === undefined ?
    DEFAULT_UNTYPED_FILES :
    [...new Set([...DEFAULT_UNTYPED_FILES, ...files])]

  return [{
    ...tsEslint.configs.disableTypeChecked as TSESLint.FlatConfig.Config,
    files: resolvedFiles,
    name: 'eslint-config-typescript/untyped-files'
  }]
}

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
      files: pluginSetupFiles,
      name: 'eslint-config-typescript/setup',
      plugins: {
        '@typescript-eslint': tsEslint.plugin
      }
    },
    {
      files: parserSetupFiles,
      languageOptions: {
        parserOptions
      },
      name: 'eslint-config-typescript/setup-parser-options'
    },
    ...baseConfigs.flatMap(c => mapRulesToSlots(c, `ts-${mode}`)),
    {
      files: [...GLOB_TS, ...GLOB_VIRTUAL_TS],
      languageOptions: {
        ecmaVersion: 'latest',
        parser: tsParser,
        parserOptions
      },
      name: 'eslint-config-typescript/parser-setup'
    },
    {
      files: parserSetupSlotFiles,
      languageOptions: {
        ecmaVersion: 'latest',
        parserOptions
      },
      name: 'eslint-config-typescript/parser-setup-slots'
    },
    {
      files: ['**/*.astro/*.js'],
      languageOptions: {
        parser: astroVirtualJsParser as TSESLint.FlatConfig.Parser
      },
      name: 'eslint-config-typescript/astro-virtual-js-parser'
    },
    {
      files: GLOB_VIRTUAL_TS,
      languageOptions: {
        parserOptions: {
          project: false,
          projectService: false
        }
      },
      name: 'eslint-config-typescript/virtual-parser-setup'
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
        { ...tsEslint.configs.disableTypeChecked as TSESLint.FlatConfig.Config, name: 'eslint-config-typescript/disable-type-checked' }, 'ts-syntax-disable-type-checked'
      ) :
      [{
        files: typeCheckedFiles,
        ignores: virtualTypeCheckedFiles,
        name: 'eslint-config-typescript/type-checked-rules',
        rules: typeCheckedRules
      }]
    ),
    ...(mode === 'strict' ?
      [{
        files: typedFiles,
        ignores: virtualTypeCheckedFiles,
        name: 'eslint-config-typescript/strict-mode-rules',
        rules: strictModeRules
      }] :
      []),
    ...(mode === 'syntax' ? [] : createUntypedFilesConfig(options.untypedFiles))
  ]
}

export const typescriptConfig = createTypescriptConfig()

// Re-export rules for direct access
export { standardRules, typeCheckedRules }

export default typescriptConfig
