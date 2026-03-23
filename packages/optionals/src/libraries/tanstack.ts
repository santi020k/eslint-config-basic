import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * TanStack Query ESLint configuration
 */
export const tanstackQuery: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-optionals/tanstack-query',
    plugins: {
      '@tanstack/query': pluginQuery
    },
    rules: {
      ...pluginQuery.configs.recommended.rules
    }
  }
]

/**
 * TanStack Router ESLint configuration
 */
export const tanstackRouter: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-optionals/tanstack-router',
    plugins: {
      '@tanstack/router': pluginRouter
    },
    rules: {
      ...pluginRouter.configs.recommended.rules
    }
  }
]
