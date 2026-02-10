import { rules } from './rules.js'

import nestPlugin from '@darraghor/eslint-plugin-nestjs-typed'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * NestJS ESLint configuration
 * Includes NestJS plugin with recommended rules
 */
export const nestConfig: TSESLint.FlatConfig.ConfigArray = [
  // Spread the recommended flat config from the plugin
  ...(nestPlugin.configs.flatRecommended as TSESLint.FlatConfig.ConfigArray),
  {
    name: 'eslint-config-nest/custom',
    rules
  }
]

// Re-export rules for direct access
export { rules }
