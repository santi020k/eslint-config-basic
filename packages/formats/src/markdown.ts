import type { TSESLint } from '@typescript-eslint/utils'

import { type ConfigWithRules, defineLazyConfig, loadDefault } from './lazy.js'

interface MarkdownPlugin {
  configs: {
    recommended: TSESLint.FlatConfig.ConfigArray
  }
}

interface TypescriptEslint {
  configs: {
    disableTypeChecked: ConfigWithRules
  }
}

/**
 * Markdown ESLint configuration
 * Lints markdown files for common issues
 */
export const markdown: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('markdown', async () => {
  const pluginMarkdown = await loadDefault<MarkdownPlugin>('@eslint/markdown')
  const tsEslint = await loadDefault<TypescriptEslint>('typescript-eslint')

  return [
    ...(pluginMarkdown.configs.recommended),
    {
      files: ['**/*.md'],
      language: 'markdown/commonmark',
      name: 'integrations/markdown',
      rules: {
        '@stylistic/indent': 'off',
        '@stylistic/jsx-closing-bracket-location': 'off',
        '@stylistic/jsx-tag-spacing': 'off',
        '@stylistic/lines-around-comment': 'off',
        '@stylistic/no-multi-spaces': 'off',
        'comma-dangle': 'off',
        // Disable js/ts Eslint rules that conflict with markdown
        indent: 'off',
        'markdown/fenced-code-language': 'error',
        'markdown/heading-increment': 'error',
        'markdown/no-duplicate-headings': 'off',
        'markdown/no-empty-links': 'error',
        'markdown/no-html': 'off',
        'markdown/no-invalid-label-refs': 'error',
        'markdown/no-missing-label-refs': 'off',
        'no-irregular-whitespace': 'off',
        'no-multi-spaces': 'off',
        'no-unused-vars': 'off'
      }
    },
    {
      files: ['**/*.md/*.ts', '**/*.md/*.tsx', '**/*.md/*.js', '**/*.md/*.jsx'],
      languageOptions: {
        parserOptions: {
          allowDefaultProject: true,
          program: null,
          project: null,
          projectService: false
        }
      },
      name: 'integrations/markdown-code-blocks',
      rules: {
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        // Disable type-aware rules — code blocks in markdown have no tsconfig
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        // Disable other rules that don't make sense for code snippets
        ...tsEslint.configs.disableTypeChecked.rules,
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off'
      }
    }
  ]
})
