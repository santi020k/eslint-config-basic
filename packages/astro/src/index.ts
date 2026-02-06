import pluginAstro from 'eslint-plugin-astro'

import type { TSESLint } from '@typescript-eslint/utils'

import { rules } from './rules.js'

/**
 * Astro ESLint configuration
 * Includes Astro plugin recommended rules and custom overrides
 */
export const astroConfig: TSESLint.FlatConfig.ConfigArray = [
  ...(pluginAstro.configs.recommended as TSESLint.FlatConfig.ConfigArray),
  {
    name: 'eslint-config-astro/custom',
    files: ['**/*.astro'],
    rules
  }
]
