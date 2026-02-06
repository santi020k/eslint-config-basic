import pluginTailwind from 'eslint-plugin-tailwindcss'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Tailwind CSS ESLint configuration
 * Enforces Tailwind CSS best practices
 */
export const tailwind: TSESLint.FlatConfig.ConfigArray = [
  ...(pluginTailwind.configs['flat/recommended'] as TSESLint.FlatConfig.ConfigArray)
]
