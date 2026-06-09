import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Tailwind CSS ESLint configuration
 * Enforces Tailwind CSS best practices using eslint-plugin-better-tailwindcss
 */
export const tailwind: Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('tailwind', async () => {
  const pluginTailwind = await loadDefault<PluginWithConfigs<'recommended'>>('eslint-plugin-better-tailwindcss')

  return [
    {
      ...pluginTailwind.configs.recommended,
      files: GLOB_JS_TS_ALL,
      name: 'santi020k/tailwind/recommended',
      settings: {
        'better-tailwindcss': {
          // Enable faster resolution in monorepos
        }
      }
    }
  ]
})
