import pluginReactCompiler from 'eslint-plugin-react-compiler'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

import { rules } from './rules.js'

import pluginReact from '@eslint-react/eslint-plugin'
import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

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
    }
  },
  sourceType: 'module'
}

/**
 * React ESLint configuration
 * Uses `@eslint-react/eslint-plugin` for React and hooks rules, plus React
 * Compiler and React Refresh.
 */
export const reactConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    files: GLOB_JS_TS,
    languageOptions,
    name: 'eslint-config-react/recommended',
    plugins: {
      ...(recommended.plugins ?? {})
    },
    rules: {
      ...recommended.rules
    },
    settings: {
      ...recommended.settings
    }
  },
  {
    files: GLOB_JS_TS,
    languageOptions,
    name: 'eslint-config-react/custom',
    plugins: {
      'react-compiler': pluginReactCompiler,
      'react-refresh': pluginReactRefresh
    },
    rules: {
      'react-compiler/react-compiler': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...rules
    }
  }
]

// Re-export rules for direct access
export { rules }

export default reactConfig
