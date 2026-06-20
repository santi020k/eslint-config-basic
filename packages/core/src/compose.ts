import type { TSESLint } from '@typescript-eslint/utils'

import type { FlatConfigArray } from './types.js'

export type NormalizedStrictMode = 'ci' | 'pedantic' | 'recommended'

export const normalizeStrictMode = (strict: boolean | NormalizedStrictMode | undefined): NormalizedStrictMode => {
  if (strict === true) return 'ci'

  if (strict === 'ci' || strict === 'pedantic') return strict

  return 'recommended'
}

const promoteRuleSeverity = (
  value: TSESLint.FlatConfig.RuleEntry | undefined
): TSESLint.FlatConfig.RuleEntry | undefined => {
  if (value === undefined) return undefined

  if (value === 'warn' || value === 1) return 'error'

  if (Array.isArray(value) && (value[0] === 'warn' || value[0] === 1)) {
    return ['error', ...value.slice(1)] as TSESLint.FlatConfig.RuleEntry
  }

  return value
}

/**
 * Applies strict mode by promoting all 'warn' rules to 'error'.
 */
export const applyStrictMode = (
  configs: FlatConfigArray,
  strict: boolean | NormalizedStrictMode | undefined
): FlatConfigArray => {
  const strictMode = normalizeStrictMode(strict)

  if (strictMode === 'recommended') return configs

  type ConfigEntry = TSESLint.FlatConfig.Config | TSESLint.FlatConfig.ConfigArray

  const recurse = (item: ConfigEntry): ConfigEntry => {
    if (Array.isArray(item)) {
      return item.map(config => recurse(config) as TSESLint.FlatConfig.Config)
    }

    if (item.rules) {
      const strictRules = Object.fromEntries(
        Object.entries(item.rules).map(([key, value]) => [key, promoteRuleSeverity(value)])
      )

      return { ...item, rules: strictRules }
    }

    return item
  }

  return recurse(configs) as FlatConfigArray
}
