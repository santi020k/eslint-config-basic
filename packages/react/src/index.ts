import pluginReact from '@eslint-react/eslint-plugin'
import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

import { rules } from './rules.js'

const recommended = pluginReact.configs.recommended as TSESLint.FlatConfig.Config & {
  rules: TSESLint.FlatConfig.Rules
  settings: TSESLint.FlatConfig.Config['settings']
}

const reactHooksRecommended = pluginReactHooks.configs.flat['recommended-latest'] as TSESLint.FlatConfig.Config & {
  rules: TSESLint.FlatConfig.Rules
}

const compilerRules = Object.fromEntries(
  Object.entries(reactHooksRecommended.rules)
    .filter(([ruleName]) => {
      const equivalentRuleName = ruleName.replace(/^react-hooks\//, '@eslint-react/')

      return !(equivalentRuleName in recommended.rules)
    })
    .map(([ruleName, ruleConfig]) => [
      ruleName,
      Array.isArray(ruleConfig) ? ['warn', ...ruleConfig.slice(1)] : 'warn'
    ])
) as TSESLint.FlatConfig.Rules

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
 * Uses `@eslint-react/eslint-plugin` for React and hooks rules, the official
 * React Hooks plugin for non-duplicated Compiler diagnostics, and React Refresh.
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
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh
    },
    rules: {
      ...compilerRules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...rules
    }
  }
]

// Re-export rules for direct access
export { rules }

export default reactConfig
