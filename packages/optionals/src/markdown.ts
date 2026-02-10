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
      indent: 'off',
      'no-irregular-whitespace': 'off',
      '@stylistic/indent': 'off',
      'no-unused-vars': 'off',
      '@stylistic/jsx-closing-bracket-location': 'off',
      'no-multi-spaces': 'off',
      '@stylistic/no-multi-spaces': 'off',
      'comma-dangle': 'off',
      '@stylistic/jsx-tag-spacing': 'off'
    }
  },
  {
    name: 'optionals/markdown-code-blocks',
    files: ['**/*.md/*.ts', '**/*.md/*.tsx', '**/*.md/*.js', '**/*.md/*.jsx'],
    rules: {
      // Disable type-aware rules — code blocks in markdown have no tsconfig
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/unbound-method': 'off',
      // Disable other rules that don't make sense for code snippets
      'import/no-unresolved': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    },
    languageOptions: {
      parserOptions: {
        project: null,
        program: null
      }
    }
  }
]
