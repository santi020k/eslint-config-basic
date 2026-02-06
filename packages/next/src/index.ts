import { rules } from './rules.js'

import pluginNext from '@next/eslint-plugin-next'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Next.js ESLint configuration
 * Includes Next.js plugin with core-web-vitals rules
 */
export const nextConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-next/plugin',
    plugins: {
      '@next/next': pluginNext
    },
    rules: {
      ...pluginNext.configs['core-web-vitals'].rules
    }
  },
  {
    name: 'eslint-config-next/custom',
    rules
  },
  {
    name: 'eslint-config-next/ignores',
    ignores: ['.next/*']
  }
]

// Re-export rules for direct access
export { rules }
