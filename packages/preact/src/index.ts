import pluginReact from '@eslint-react/eslint-plugin'
import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'
import globals from 'globals'

import { rules } from './rules.js'

const recommended = pluginReact.configs.recommended as TSESLint.FlatConfig.Config & {
  rules: TSESLint.FlatConfig.Rules
  settings: TSESLint.FlatConfig.Config['settings']
}

const languageOptions: TSESLint.FlatConfig.LanguageOptions = {
  ecmaVersion: 'latest',
  globals: {
    ...globals.browser,
    ...globals.node
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    jsxFragmentName: 'Fragment',
    jsxPragma: 'h'
  },
  sourceType: 'module'
}

/**
 * Preact ESLint configuration
 * Uses `@eslint-react/eslint-plugin` for Preact and hooks rules.
 */
export const preactConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    files: GLOB_JS_TS,
    languageOptions,
    name: 'eslint-config-preact/recommended',
    plugins: {
      ...(recommended.plugins ?? {})
    },
    rules: {
      ...recommended.rules
    },
    settings: {
      ...recommended.settings,
      react: {
        fragment: 'Fragment',
        pragma: 'h'
      }
    }
  },
  {
    files: GLOB_JS_TS,
    languageOptions,
    name: 'eslint-config-preact/custom',
    rules: {
      ...rules
    }
  }
]

// Re-export rules for direct access
export { rules }

export default preactConfig
