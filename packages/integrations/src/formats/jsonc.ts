import type PluginJsonc from 'eslint-plugin-jsonc'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * JSON/JSONC ESLint configuration
 * Provides rules for JSON file linting and package.json key sorting
 */
export const jsonc: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('jsonc', async () => {
  const pluginJsonc = await loadDefault<typeof PluginJsonc>('eslint-plugin-jsonc')

  const recommended = (pluginJsonc.configs['flat/recommended-with-jsonc'] as TSESLint.FlatConfig.ConfigArray).map((config) => {
    if (config.rules && !config.files) {
      return {
        ...config,
        files: [
          '*.json',
          '**/*.json',
          '*.json5',
          '**/*.json5',
          '*.jsonc',
          '**/*.jsonc'
        ]
      }
    }

    return config
  })

  return [
    ...recommended,
    {
      files: ['**/package.json'],
      name: 'integrations/jsonc/sorting',
      rules: {
        'jsonc/sort-keys': ['warn', {
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
          ],
          pathPattern: '^$'
        }]
      }
    },
    {
      files: ['**/tsconfig.json', '**/tsconfig.*.json'],
      name: 'integrations/jsonc/tsconfig-sorting',
      rules: {
        'jsonc/sort-keys': ['warn', {
          order: ['extends', 'compilerOptions', 'include', 'exclude', 'references'],
          pathPattern: '^$'
        }]
      }
    }
  ]
})
