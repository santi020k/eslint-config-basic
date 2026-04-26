import pluginImport from 'eslint-plugin-import-x'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginSimpleImport from 'eslint-plugin-simple-import-sort'
import pluginUnusedImport from 'eslint-plugin-unused-imports'
import globals from 'globals'

import { rules } from './rules.js'
import { GLOB_JS_TS, GLOB_JS_TS_ALL, GLOB_SLOT, Runtime } from './types.js'

import eslint from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'

// Re-export types and utilities
export * from './types.js'
export * from './utils/index.js'

/**
 * Returns the appropriate globals for the given runtime option
 */
export const getGlobalsForRuntime = (runtime: Runtime = Runtime.Universal): TSESLint.FlatConfig.LanguageOptions['globals'] => {
  switch (runtime) {
    case Runtime.Node:
      return { ...globals.node }

    case Runtime.Browser:
      return { ...globals.browser }

    case Runtime.Worker:
      return { ...globals.worker, ...globals.serviceworker }

    case Runtime.Universal:
      return {
        ...globals.browser,
        ...globals.node
      }

    default:
      return {
        ...globals.browser,
        ...globals.node
      }
  }
}

/**
 * Creates the core config with the specified runtime globals
 */
export const createCoreConfig = (runtime: Runtime = Runtime.Universal): TSESLint.FlatConfig.ConfigArray => {
  const languageOptions: TSESLint.FlatConfig.LanguageOptions = {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: getGlobalsForRuntime(runtime)
  }

  // Define the base sets of configurations we want to wrap
  const baseConfigs: TSESLint.FlatConfig.Config[] = [
    {
      name: '@eslint/js/recommended',
      ...eslint.configs.recommended
    },
    {
      name: 'n/recommended',
      ...pluginN.configs['flat/recommended']
    },
    {
      name: 'promise/recommended',
      ...pluginPromise.configs['flat/recommended']
    },
    {
      name: 'stylistic/recommended',
      ...pluginStylistic.configs.recommended
    },
    {
      name: 'eslint-config/plugins-rules',
      languageOptions,
      rules: {
        'import/first': 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports': 'error'
      }
    },
    {
      name: 'eslint-config/custom-rules',
      languageOptions,
      rules
    }
  ]

  // Map them to JS/TS files and Slots
  const mappedConfigs: TSESLint.FlatConfig.ConfigArray = baseConfigs.flatMap(config => [
    {
      ...config,
      files: GLOB_JS_TS
    },
    ...(config.rules ?
      [
        {
          name: `${config.name ?? 'core'}/slots`,
          files: GLOB_SLOT,
          rules: config.rules
        }
      ] :
      [])
  ])

  // Return final array with global plugin setup
  return [
    {
      name: 'eslint-config/core-plugins',
      files: GLOB_JS_TS_ALL, // Ensure plugins are available for all compatible files
      plugins: {
        import: pluginImport,
        n: pluginN,
        promise: pluginPromise,
        stylistic: pluginStylistic,
        '@stylistic': pluginStylistic,
        'simple-import-sort': pluginSimpleImport,
        'jsx-a11y': pluginJsxA11y,
        'unused-imports': pluginUnusedImport
      }
    },
    ...mappedConfigs
  ]
}

/**
 * Core JavaScript ESLint configuration (Universal runtime by default)
 * This is included by default in all configurations
 */
export const coreConfig: TSESLint.FlatConfig.ConfigArray = createCoreConfig()

// Legacy export for backwards compatibility
export { coreConfig as jsConfig }

// Export rules and groups for use by other packages
export { groups, rules } from './rules.js'

// Export settings
export { gitignore } from './settings/index.js'
