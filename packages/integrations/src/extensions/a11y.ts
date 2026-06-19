import { GLOB_JS_TS_ALL, GLOB_VUE } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'
import type PluginJsxA11y from 'eslint-plugin-jsx-a11y'
import type PluginVueA11y from 'eslint-plugin-vuejs-accessibility'

import { defineLazyConfig, loadDefault } from '../lazy.js'

/**
 * A11y extension configurations
 * Provides accessibility linting for JSX and Vue
 */
export const a11y: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('a11y', async () => {
  const pluginJsxA11y = await loadDefault<typeof PluginJsxA11y>('eslint-plugin-jsx-a11y')
  const pluginVueA11y = await loadDefault<typeof PluginVueA11y>('eslint-plugin-vuejs-accessibility')

  return [
    {
      files: GLOB_JS_TS_ALL,
      name: 'eslint-config-integrations/a11y/jsx',
      plugins: {
        'jsx-a11y': pluginJsxA11y
      },
      rules: pluginJsxA11y.configs.recommended.rules
    },
    ...pluginVueA11y.configs['flat/recommended'].map((config: TSESLint.FlatConfig.Config) => ({
      ...config,
      files: GLOB_VUE,
      name: `eslint-config-integrations/a11y/vue${config.name ? `/${config.name}` : ''}`
    }))
  ]
})
