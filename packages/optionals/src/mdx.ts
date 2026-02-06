import * as pluginMdx from 'eslint-plugin-mdx'

import type { TSESLint } from '@typescript-eslint/utils'

const rules: TSESLint.Linter.RulesRecord = {
  ...pluginMdx.flatCodeBlocks.rules,
  'no-var': 'error',
  'prefer-const': 'error',
  'react/react-in-jsx-scope': 0,
  'no-unused-vars': 'off',
  '@stylistic/indent': 'off',
  '@stylistic/jsx-closing-bracket-location': 'off',
  'indent': 'off',
  'no-multi-spaces': 'off',
  '@stylistic/no-multi-spaces': 'off',
  'comma-dangle': 'off',
  '@stylistic/jsx-tag-spacing': 'off',
  'import/export': 'off'
}

/**
 * MDX ESLint configuration
 * Lints MDX files with proper code block handling
 */
export const mdx: TSESLint.FlatConfig.ConfigArray = [
  {
    files: ['**/*.mdx'],
    ...pluginMdx.flat,
    processor: pluginMdx.createRemarkProcessor({
      lintCodeBlocks: true,
      languageMapper: {}
    }),
    rules
  } as TSESLint.FlatConfig.Config,
  {
    files: ['**/*.mdx'],
    ...pluginMdx.flatCodeBlocks,
    rules
  } as TSESLint.FlatConfig.Config
]
