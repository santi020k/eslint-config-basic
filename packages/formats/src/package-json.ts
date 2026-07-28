import type { TSESLint } from '@typescript-eslint/utils'
import type PluginPackageJson from 'eslint-plugin-package-json'

import { defineLazyConfig, loadDefault } from './lazy.js'

/**
 * Package.json ESLint configuration
 * Provides validation for npm package standards
 */
export const packageJson: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('packageJson', async () => {
  const pluginPackageJson = await loadDefault<typeof PluginPackageJson>('eslint-plugin-package-json')
  const config = { ...pluginPackageJson.configs.recommended } as TSESLint.FlatConfig.Config

  delete config.name

  return [
    {
      ...config,
      name: 'eslint-config-integrations/package-json'
    }
  ]
})
