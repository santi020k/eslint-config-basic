import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault } from '../lazy.js'

interface BiomeConfig { rules?: TSESLint.FlatConfig.Rules }

/**
 * Biome extension configurations
 * Disables rules that conflict with Biome formatting and linting.
 */
export const biome: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('biome', async () => {
  const biomeConfig = await loadDefault<BiomeConfig>('eslint-config-biome')

  return [
    {
      files: GLOB_JS_TS_ALL,
      name: 'eslint-config-integrations/biome',
      rules: {
        ...biomeConfig.rules
      }
    }
  ]
})
