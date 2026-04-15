import pluginAstro from 'eslint-plugin-astro'

import { type AstroOptions, getRules } from './rules.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Creates Astro ESLint configuration based on enabled frameworks
 *
 * @param options - Framework-specific options for Astro files
 * @returns {TSESLint.FlatConfig.ConfigArray} The Astro configuration array
 */
export const createAstroConfig = (options?: AstroOptions): TSESLint.FlatConfig.ConfigArray => [
  ...pluginAstro.configs.recommended,
  {
    name: 'eslint-config-astro/custom',
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        project: true,
        projectService: false,
        tsconfigRootDir: options?.tsconfigRootDir
      }
    },
    rules: getRules(options)
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

// Default export as factory function
export default createAstroConfig

// Static config for backwards compatibility (no frameworks by default)
export const astroConfig = createAstroConfig()

// Re-export types and utilities
export { getRules }
export type { AstroOptions }
