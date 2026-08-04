import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'
import type PluginJestDom from 'eslint-plugin-jest-dom'

import { defineLazyConfig, loadDefault } from './lazy.js'

/**
 * Jest DOM ESLint configuration
 * Provides rules for \@testing-library/jest-dom
 */
export const jestDom: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('jestDom', async () => {
  const pluginJestDom = await loadDefault<typeof PluginJestDom>('eslint-plugin-jest-dom')

  return [
    {
      files: GLOB_JS_TS,
      name: 'eslint-config-integrations/jest-dom',
      plugins: {
        'jest-dom': pluginJestDom
      },
      rules: {
        ...pluginJestDom.configs.recommended.rules
      }
    }
  ]
})
