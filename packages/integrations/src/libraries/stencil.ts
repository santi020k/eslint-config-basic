import { fixupPluginRules } from '@eslint/compat'
import type StencilPlugin from '@stencil-community/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault } from '../lazy.js'

/**
 * Stencil ESLint configuration
 * Enforces best practices for Stencil.js components
 */
export const stencil: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('stencil', async () => {
  const stencilPlugin = await loadDefault<typeof StencilPlugin>('@stencil-community/eslint-plugin')

  return [
    {
      files: ['**/*.{tsx,ts}'],
      name: 'integrations/stencil',
      plugins: {
        '@stencil-community': fixupPluginRules(stencilPlugin as unknown as Record<string, unknown>)
      },
      rules: {
        '@stencil-community/async-methods': 'error',
        '@stencil-community/ban-prefix': ['error', ['stencil', 'stnl', 'st']],
        '@stencil-community/decorators-context': 'error',
        '@stencil-community/decorators-style': [
          'error', {
            element: 'inline',
            event: 'inline',
            listen: 'multiline',
            method: 'multiline',
            prop: 'inline',
            state: 'inline',
            watch: 'multiline'
          }],
        '@stencil-community/element-type': 'error',
        '@stencil-community/host-data-deprecated': 'error',
        '@stencil-community/methods-must-be-public': 'error',
        '@stencil-community/no-unused-watch': 'error',
        '@stencil-community/own-methods-must-be-private': 'error',
        '@stencil-community/own-props-must-be-private': 'error',
        '@stencil-community/prefer-vdom-listener': 'error',
        '@stencil-community/props-must-be-public': 'error',
        '@stencil-community/props-must-be-readonly': 'error',
        '@stencil-community/render-returns-host': 'error',
        '@stencil-community/required-jsdoc': 'error',
        '@stencil-community/reserved-member-names': 'error',
        '@stencil-community/single-export': 'error',
        '@stencil-community/strict-mutable': 'error'
      }
    }
  ]
})
