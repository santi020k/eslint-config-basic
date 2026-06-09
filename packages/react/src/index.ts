// @ts-check
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import pluginReactHooks from 'eslint-plugin-react-hooks'
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
    name: 'eslint-config-react/recommended',
    files: GLOB_JS_TS,
    languageOptions,
    settings: {
      react: {
        version: 'detect'
      }
    }
  })) as unknown as TSESLint.FlatConfig.ConfigArray),
  {
    name: 'eslint-config-react/custom',
    plugins: {
      'react-hooks': pluginReactHooks
    },
    languageOptions,
    files: GLOB_JS_TS,
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...rules
    }
  }
]

// Re-export rules for direct access
export { rules }

export default reactConfig
