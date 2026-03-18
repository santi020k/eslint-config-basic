/**
 * Helper: collect all rule names from a composed config
 */
export const extractRuleNames = (config: Record<string, unknown>[]): string[] => {
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
export const extractConfigNames = (config: Record<string, unknown>[]): string[] => config
  .map(entry => entry.name as string | undefined)
  .filter((name): name is string => typeof name === 'string')

/**
 * Helper: get the effective value of a rule from a composed config
 * (last definition wins, just like ESLint merging)
 */
export const getEffectiveRuleValue = (
  config: Record<string, unknown>[],
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
