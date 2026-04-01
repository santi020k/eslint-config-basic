import pluginImport from 'eslint-plugin-import-x'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginSimpleImport from 'eslint-plugin-simple-import-sort'
import pluginUnusedImport from 'eslint-plugin-unused-imports'
import globals from 'globals'

import { rules } from './rules.js'
import { GLOB_JS_TS, Runtime } from './types.js'

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

    case Runtime.Universal:

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

  const coreConfigs = ([
    {
      name: '@eslint/js/recommended',
      ...eslint.configs.recommended
    },
    pluginN.configs['flat/recommended'],
    pluginPromise.configs['flat/recommended'],
    {
      name: 'eslint-config/stylistic',
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
  ] as TSESLint.FlatConfig.Config[]).map(config => ({
    ...config,
    files: config.files ?? GLOB_JS_TS
  }))

  return [
    {
      name: 'eslint-config/plugins',
      plugins: {
        import: pluginImport,
        '@stylistic': pluginStylistic,
        'simple-import-sort': pluginSimpleImport,
        'jsx-a11y': pluginJsxA11y,
        'unused-imports': pluginUnusedImport
      }
    },
    ...coreConfigs
  ] as TSESLint.FlatConfig.ConfigArray
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
