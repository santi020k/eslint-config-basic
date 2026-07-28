import type { TSESLint } from '@typescript-eslint/utils'
import pluginAstro from 'eslint-plugin-astro'

import { type AstroOptions, getRules } from './rules.js'

/**
 * Creates Astro ESLint configuration based on enabled frameworks
 *
 * @param options - Framework-specific options for Astro files
 * @returns {TSESLint.FlatConfig.ConfigArray} The Astro configuration array
 */
export const createAstroConfig = (options?: AstroOptions): TSESLint.FlatConfig.ConfigArray => [
  ...pluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        project: true,
        projectService: false,
        tsconfigRootDir: options?.tsconfigRootDir
      }
    },
    name: 'eslint-config-astro/custom',
    rules: getRules(options)
  },
  {
    files: ['**/*.astro/*.js', '*.astro/*.js', '**/*.astro/*.ts', '*.astro/*.ts'],
    languageOptions: { sourceType: 'module' },
    name: 'eslint-config-astro/virtual-scripts',
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      // Disable rules that cause false positives in Astro virtual script blocks.
      // Type-checked rule disabling is handled by @santi020k/eslint-config-typescript.
      'no-unused-expressions': 'off',
      'prettier/prettier': 'off'
    }
  }
]

// Default export as factory function
export default createAstroConfig

// Re-export types and utilities
export { getRules }
export type { AstroOptions }
