import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Tailwind CSS ESLint configuration
 * Enforces Tailwind CSS best practices using eslint-plugin-better-tailwindcss
 */
export const tailwind: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('tailwind', () => {
  const pluginTailwind = loadDefault<PluginWithConfigs<'recommended'>>('eslint-plugin-better-tailwindcss')

  return [
    {
      ...pluginTailwind.configs.recommended,
      name: 'santi020k/tailwind/recommended',
      settings: {
        'better-tailwindcss': {
          // Enable faster resolution in monorepos
        }
      }
    }
  ]
})
