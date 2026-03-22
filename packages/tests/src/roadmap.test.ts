import { describe, expect, it } from 'vitest'

import { extractRuleNames, getEffectiveRuleValue } from './test-utils.js'

import { eslintConfig, Extension, Library, Tool } from '@santi020k/eslint-config-basic'

describe('v1.0.0 Roadmap Features', () => {
  it('should apply strict mode (warnings to errors)', () => {
    const config = eslintConfig({ strict: true })
    const configsWithRules = config.filter(c => 'rules' in c && c.rules)
    const allRules = configsWithRules.flatMap(c => Object.values(c.rules ?? {}))
    const arrayWarnings = allRules.filter(
      rule => Array.isArray(rule) && (rule[0] === 'warn' || rule[0] === 1)
    )

    expect(allRules).not.toContain('warn')
    expect(arrayWarnings).toHaveLength(0)
    expect(getEffectiveRuleValue(config, '@stylistic/quotes')).toEqual(['error', 'single'])
  })

  it('should include Security plugin rules', () => {
    const config = eslintConfig({ extensions: [Extension.Security] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('security/detect-object-injection')
  })

  it('should include TanStack Query rules', () => {
    const config = eslintConfig({ libraries: [Library.TanstackQuery] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('@tanstack/query/exhaustive-deps')
  })

  it('should include Perfectionist rules', () => {
    const config = eslintConfig({ extensions: [Extension.Perfectionist] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('perfectionist/sort-imports')
  })

  it('should include JSDoc rules', () => {
    const config = eslintConfig({ tools: [Tool.Jsdoc] })
    const rules = extractRuleNames(config)

    expect(rules).toContain('jsdoc/check-access')
  })
})
