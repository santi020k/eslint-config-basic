import type PluginJsonc from 'eslint-plugin-jsonc'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * JSON/JSONC ESLint configuration
 * Provides rules for JSON file linting and package.json key sorting
 */
export const jsonc: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('jsonc', () => {
  const pluginJsonc = loadDefault<typeof PluginJsonc>('eslint-plugin-jsonc')

  return [
    ...(pluginJsonc.configs['flat/recommended-with-jsonc']),
    {
      name: 'optionals/jsonc/sorting',
      files: ['**/package.json'],
      rules: {
        'jsonc/sort-keys': ['warn', {
          pathPattern: '^$',
          order: [
            'name',
            'version',
            'private',
            'publishConfig',
            'description',
            'type',
            'main',
            'module',
            'types',
            'exports',
            'files',
            'bin',
            'scripts',
            'dependencies',
            'devDependencies',
            'peerDependencies',
            'peerDependenciesMeta',
            'engines',
            'packageManager',
            'repository',
            'homepage',
            'bugs',
            'keywords',
            'author',
            'license'
          ]
        }]
      }
    },
    {
      name: 'optionals/jsonc/tsconfig-sorting',
      files: ['**/tsconfig.json', '**/tsconfig.*.json'],
      rules: {
        'jsonc/sort-keys': ['warn', {
          pathPattern: '^$',
          order: ['extends', 'compilerOptions', 'include', 'exclude', 'references']
        }]
      }
    }
  ]
})
