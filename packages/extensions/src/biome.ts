import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

import { BIOME_RULES } from './biome-rules.js'
import { defineLazyConfig } from './lazy.js'

/**
 * Biome extension configurations
 * Disables rules that conflict with Biome formatting and linting.
 */
export const biome: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('biome', () => [
  {
    files: GLOB_JS_TS_ALL,
    name: 'eslint-config-integrations/biome',
    rules: BIOME_RULES
  }
])
