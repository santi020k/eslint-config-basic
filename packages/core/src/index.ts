import eslint from '@eslint/js'
import pluginStylistic from '@stylistic/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'
import pluginImport from 'eslint-plugin-import-x'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginSimpleImport from 'eslint-plugin-simple-import-sort'
import pluginUnusedImport from 'eslint-plugin-unused-imports'
import globals from 'globals'

import { rules } from './rules.js'
import { GLOB_JS_TS, GLOB_JS_TS_ALL, GLOB_SLOT, Runtime } from './types.js'

export * from './compose.js'
export * from './config-helpers.js'
export { createModuleLoader, loadModule } from './lazy.js'

/**
 * Returns the appropriate globals for the given runtime option
 */
export const getGlobalsForRuntime = (runtime: Runtime = Runtime.Universal): TSESLint.FlatConfig.LanguageOptions['globals'] => {
  switch (runtime) {
    case Runtime.Browser:
      return { ...globals.browser }

    case Runtime.Bun:
      return {
        ...globals.bunBuiltin,
        ...globals.node,
        ...globals.browser
      }

    case Runtime.Cloudflare:
      return {
        ...globals.worker,
        ...globals.serviceworker,
        caches: 'readonly',
        DurableObject: 'readonly',
        WebSocketPair: 'readonly'
      }

    case Runtime.Deno:
      return {
        Deno: 'readonly',
        ...globals.browser
      }

    case Runtime.Node:
      return { ...globals.node }

    case Runtime.Universal:
      return {
        ...globals.browser,
        ...globals.node
      }

    case Runtime.Worker:
      return { ...globals.worker, ...globals.serviceworker }

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
    globals: getGlobalsForRuntime(runtime),
    sourceType: 'module'
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
      languageOptions,
      name: 'eslint-config/plugins-rules',
      rules: {
        'import/first': 'error',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
        'unused-imports/no-unused-imports': 'error'
      }
    },
    {
      languageOptions,
      name: 'eslint-config/custom-rules',
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
          files: GLOB_SLOT,
          name: `${config.name ?? 'core'}/slots`,
          rules: config.rules
        }
      ] :
      [])
  ])

  // Return final array with global plugin setup
  return [
    {
      files: GLOB_JS_TS_ALL, // Ensure plugins are available for all compatible files
      name: 'eslint-config/core-plugins',
      plugins: {
        '@stylistic': pluginStylistic,
        import: pluginImport,
        n: pluginN,
        promise: pluginPromise,
        'simple-import-sort': pluginSimpleImport,
        stylistic: pluginStylistic,
        'unused-imports': pluginUnusedImport
      }
    },
    ...mappedConfigs,
    // eslint.config.* files always import devDependencies (the config package itself);
    // n/no-unpublished-import false-positives on every consumer's config file.
    {
      files: ['**/eslint.config.{js,mjs,cjs,ts,mts,cts}'],
      name: 'eslint-config/eslint-config-file-overrides',
      rules: {
        'n/no-unpublished-import': 'off'
      }
    }
  ]
}

/**
 * Core JavaScript ESLint configuration (Universal runtime by default)
 * This is included by default in all configurations
 */
export const coreConfig: TSESLint.FlatConfig.ConfigArray = createCoreConfig()

// Legacy export for backwards compatibility
export { coreConfig as jsConfig }

// Export rules, groups, and import-group factory for use by other packages
export type { ImportGroupOptions } from './rules.js'
export { createImportGroups, groups, rules } from './rules.js'
// Export settings
export { createGitignoreConfig, gitignore } from './settings/index.js'
// Re-export types and utilities
export * from './types.js'
export * from './utils/index.js'
