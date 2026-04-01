import { ESLint } from 'eslint'
import type { Linter } from 'eslint'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Helper: collect all rule names from a composed config
 */
export const extractRuleNames = (config: readonly TSESLint.FlatConfig.Config[]): string[] => {
  const ruleNames = new Set<string>()

  for (const entry of config) {
    const rules = entry.rules as Record<string, unknown> | undefined

    if (rules) {
      for (const ruleName of Object.keys(rules)) {
        ruleNames.add(ruleName)
      }
    }
  }

  return [...ruleNames].sort()
}

/**
 * Helper: collect all config entry names from a composed config
 */
export const extractConfigNames = (config: readonly TSESLint.FlatConfig.Config[]): string[] => config
  .map(entry => entry.name)
  .filter((name): name is string => typeof name === 'string')

/**
 * Helper: get the effective value of a rule from a composed config
 * (last definition wins, just like ESLint merging)
 */
export const getEffectiveRuleValue = (
  config: readonly TSESLint.FlatConfig.Config[],
  ruleName: string
): unknown => {
  let value: unknown

  for (const entry of config) {
    const rules = entry.rules as Record<string, unknown> | undefined

    if (rules && ruleName in rules) {
      value = rules[ruleName]
    }
  }

  return value
}

/**
 * Helper: lint a string of code with a given config
 */
export const lintText = async (
  code: string,
  config: readonly TSESLint.FlatConfig.Config[],
  fileName = 'test.ts'
): Promise<ESLint.LintResult[]> => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: config as Linter.Config[],
  })

  return await eslint.lintText(code, { filePath: fileName })
}

/**
 * Helper: lint a file with a given config
 */
export const lintFile = async (
  filePath: string,
  config: readonly TSESLint.FlatConfig.Config[]
): Promise<ESLint.LintResult[]> => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: config as Linter.Config[],
  })

  return await eslint.lintFiles([filePath])
}
