import pluginMarkdown from '@eslint/markdown'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Markdown ESLint configuration
 * Lints markdown files for common issues
 */
export const markdown: TSESLint.FlatConfig.ConfigArray = [
  ...(pluginMarkdown.configs.recommended as TSESLint.FlatConfig.ConfigArray),
  {
    name: 'optionals/markdown',
    files: ['**/*.md'],
    language: 'markdown/commonmark',
    rules: {
      'markdown/fenced-code-language': 'error',
      'markdown/heading-increment': 'error',
      'markdown/no-duplicate-headings': 'off',
      'markdown/no-empty-links': 'error',
      'markdown/no-html': 'off',
      'markdown/no-invalid-label-refs': 'error',
      'markdown/no-missing-label-refs': 'off',
      // Disable js/ts Eslint rules that conflict with markdown
      'indent': 'off',
      'no-irregular-whitespace': 'off',
      '@stylistic/indent': 'off',
      'no-unused-vars': 'off',
      '@stylistic/jsx-closing-bracket-location': 'off',
      'no-multi-spaces': 'off',
      '@stylistic/no-multi-spaces': 'off',
      'comma-dangle': 'off',
      '@stylistic/jsx-tag-spacing': 'off'
    }
  }
]
