import { rules } from './rules.js'

import pluginNext from '@next/eslint-plugin-next'
import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Next.js ESLint configuration
 * Includes Next.js plugin with core-web-vitals rules
 */
export const nextConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-next/plugin',
    files: GLOB_JS_TS,
    plugins: {
      '@next/next': pluginNext
    },
    rules: {
      ...(pluginNext.configs.recommended.rules as TSESLint.FlatConfig.Rules),
      ...(pluginNext.configs['core-web-vitals'].rules as TSESLint.FlatConfig.Rules)
    }
  },
  {
    name: 'eslint-config-next/custom',
    files: GLOB_JS_TS,
    rules
  },
  {
    name: 'eslint-config-next/ignores',
    ignores: ['.next/*']
  }
]

// Re-export rules for direct access
export { rules }

export default nextConfig
