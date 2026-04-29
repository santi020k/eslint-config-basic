import type * as PluginMdx from 'eslint-plugin-mdx'
import type TsEslint from 'typescript-eslint'

import { defineLazyConfig, loadDefault, loadModule } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * MDX ESLint configuration
 * Lints MDX files with proper code block handling
 */
export const mdx: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('mdx', () => {
  const pluginMdx = loadModule<typeof PluginMdx>('eslint-plugin-mdx')
  const tsEslint = loadDefault<typeof TsEslint>('typescript-eslint')

  const rules: TSESLint.Linter.RulesRecord = {
    ...pluginMdx.flatCodeBlocks.rules,
    'no-var': 'error',
    'prefer-const': 'error',
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 'off',
    '@stylistic/indent': 'off',
    '@stylistic/jsx-closing-bracket-location': 'off',
    indent: 'off',
    'no-multi-spaces': 'off',
    '@stylistic/no-multi-spaces': 'off',
    'comma-dangle': 'off',
    '@stylistic/jsx-tag-spacing': 'off',
    'import/export': 'off'
  }

  return [
    {
      files: ['**/*.mdx'],
      ...pluginMdx.flat,
      processor: pluginMdx.createRemarkProcessor({
        lintCodeBlocks: true,
        languageMapper: {}
      }),
      rules
    },
    {
      files: ['**/*.mdx'],
      ...pluginMdx.flatCodeBlocks,
      rules
    },
    {
      name: 'eslint-config-mdx/disable-type-checked',
      files: ['**/*.mdx/*.ts', '**/*.mdx/*.tsx'],
      languageOptions: {
        parserOptions: {
          project: null,
          program: null,
          projectService: false,
          allowDefaultProject: true
        }
      },
      rules: {
        ...tsEslint.configs.disableTypeChecked.rules,
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'off'
      }
    }
  ]
})
