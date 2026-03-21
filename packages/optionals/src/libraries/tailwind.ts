import pluginTailwind from 'eslint-plugin-better-tailwindcss'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Tailwind CSS ESLint configuration
 * Enforces Tailwind CSS best practices using eslint-plugin-better-tailwindcss
 */
export const tailwind: TSESLint.FlatConfig.ConfigArray = [
  pluginTailwind.configs.recommended
]
