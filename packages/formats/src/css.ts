import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from './lazy.js'

/**
 * CSS ESLint configuration
 * Lints plain CSS files using the official `@eslint/css` language plugin
 */
export const css: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('css', async () => {
  const pluginCss = await loadDefault<PluginWithConfigs<'recommended'>>('@eslint/css')

  return [
    {
      files: ['**/*.css'],
      language: 'css/css',
      name: 'integrations/css/recommended',
      plugins: {
        css: pluginCss
      },
      rules: {
        ...pluginCss.configs.recommended.rules
      }
    }
  ]
})
