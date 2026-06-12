import { defineLazyConfig, loadDefault, loadModule } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

interface HtmlPlugin {
  configs: Record<'flat/recommended', TSESLint.FlatConfig.Config>
}

/**
 * HTML ESLint configuration
 * Lints plain HTML files using `@html-eslint/eslint-plugin` and its parser
 */
export const html: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('html', async () => {
  const pluginHtml = await loadDefault<HtmlPlugin>('@html-eslint/eslint-plugin')
  const parserHtml = await loadModule<TSESLint.FlatConfig.Parser>('@html-eslint/parser')
  const recommended = pluginHtml.configs['flat/recommended']

  return [
    {
      ...recommended,
      files: ['**/*.html'],
      languageOptions: {
        ...recommended.languageOptions,
        parser: parserHtml
      },
      name: 'integrations/html/recommended'
    },
    {
      files: ['**/*.html'],
      name: 'integrations/html/rules',
      rules: {
        '@html-eslint/no-inline-styles': 'warn',
        '@html-eslint/require-button-type': 'warn'
      }
    }
  ]
})
