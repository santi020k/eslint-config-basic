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
      'prettier/prettier': 'off',
      // Disable rules that cause false positives in Astro virtual script blocks.
      // Type-checked rule disabling is handled by @santi020k/eslint-config-typescript.
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
]

// Re-export rules for direct access
export { rules }

export default astroConfig
