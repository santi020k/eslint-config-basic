// @ts-check
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import pluginReactCompiler from 'eslint-plugin-react-compiler'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

import { rules } from './rules.js'

import { fixupConfigRules } from '@eslint/compat'
import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

const languageOptions: TSESLint.FlatConfig.LanguageOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  ...(pluginReactConfig.languageOptions ?? {}),
  globals: {
    ...globals.browser,
    ...globals.node
  }
}

/**
 * React ESLint configuration
 * Includes React plugin recommended rules and React Hooks
 */
export const reactConfig: TSESLint.FlatConfig.ConfigArray = [
  // Use type assertion to handle @eslint/compat type mismatch
  ...(fixupConfigRules(pluginReactConfig as unknown as Parameters<typeof fixupConfigRules>[0]).map(react => ({
    ...react,
    files: GLOB_JS_TS,
    languageOptions,
    name: 'eslint-config-react/recommended',
    settings: {
      react: {
        version: 'detect'
      }
    }
  })) as unknown as TSESLint.FlatConfig.ConfigArray),
  {
    files: GLOB_JS_TS,
    languageOptions,
    name: 'eslint-config-react/custom',
    plugins: {
      'react-compiler': pluginReactCompiler,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-compiler/react-compiler': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...rules
    }
  }
]

// Re-export rules for direct access
export { rules }

export default reactConfig
