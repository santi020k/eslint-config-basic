import pluginAstro from 'eslint-plugin-astro'

import { rules } from './rules.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Astro ESLint configuration
 * Includes Astro plugin recommended rules and custom overrides
 */
export const astroConfig: TSESLint.FlatConfig.ConfigArray = [
  ...pluginAstro.configs.recommended,
  {
    name: 'eslint-config-astro/custom',
    files: ['**/*.astro'],
    rules
  },
  {
    name: 'eslint-config-astro/virtual-scripts',
    files: ['**/*.astro/*.js', '*.astro/*.js', '**/*.astro/*.ts', '*.astro/*.ts'],
    languageOptions: { sourceType: 'module' },
    rules: {
      'prettier/prettier': 'off'
    }
  }
]

// Re-export rules for direct access
export { rules }

export default astroConfig
