import { defineLazyConfig, loadDefault } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

interface OxlintPlugin {
  configs: Record<string, TSESLint.FlatConfig.ConfigArray>
}

/**
 * Oxlint extension configuration
 * Disables ESLint rules already covered by Oxlint so both linters can run
 * side by side without duplicate reports (analogous to the Biome extension)
 */
export const oxlint: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('oxlint', async () => {
  const pluginOxlint = await loadDefault<OxlintPlugin>('eslint-plugin-oxlint')

  return [
    ...pluginOxlint.configs['flat/recommended'].map(config => ({
      ...config,
      name: `integrations/oxlint${config.name ? `/${config.name}` : ''}`
    }))
  ]
})
