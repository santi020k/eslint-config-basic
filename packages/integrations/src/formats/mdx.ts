import type * as PluginMdx from 'eslint-plugin-mdx'
import type TsEslint from 'typescript-eslint'

import { defineLazyConfig, loadDefault, loadModule } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * MDX ESLint configuration
 * Lints MDX files with proper code block handling
 */
export const mdx: Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('mdx', async () => {
  const pluginMdx = await loadModule<typeof PluginMdx>('eslint-plugin-mdx')
  const tsEslint = await loadDefault<typeof TsEslint>('typescript-eslint')

  const rules: TSESLint.Linter.RulesRecord = {
    ...pluginMdx.flatCodeBlocks.rules,
    '@stylistic/indent': 'off',
    '@stylistic/jsx-closing-bracket-location': 'off',
    '@stylistic/jsx-tag-spacing': 'off',
    '@stylistic/no-multi-spaces': 'off',
    'comma-dangle': 'off',
    indent: 'off',
    'no-multi-spaces': 'off',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
    'react/react-in-jsx-scope': 0
  }

  return [
    {
      files: ['**/*.mdx'],
      ...pluginMdx.flat,
      processor: pluginMdx.createRemarkProcessor({
        languageMapper: {},
        lintCodeBlocks: true
      }),
      rules
    },
    {
      files: ['**/*.mdx'],
      ...pluginMdx.flatCodeBlocks,
      rules
    },
    {
      files: ['**/*.mdx/*.ts', '**/*.mdx/*.tsx'],
      languageOptions: {
        parserOptions: {
          allowDefaultProject: true,
          program: null,
          project: null,
          projectService: false
        }
      },
      name: 'eslint-config-mdx/disable-type-checked',
      rules: {
        ...tsEslint.configs.disableTypeChecked.rules,
        '@typescript-eslint/no-unused-expressions': 'off',
        'no-unused-expressions': 'off'
      }
    }
  ]
})
