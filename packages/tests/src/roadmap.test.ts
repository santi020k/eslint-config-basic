import { describe, expect, it } from 'vitest'

import { extractRuleNames } from './test-utils.js'

import { eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

describe('v1.0.0 Roadmap Features', () => {
  it('should apply strict mode (warnings to errors)', () => {
    // We need a config that has a 'warn' rule. coreConfig has some.
    const config = eslintConfig({ strict: true })
    const configsWithRules = config.filter(c => 'rules' in c)

    // Check if any rule that was 'warn' is now 'error'
    // This is a bit tricky to test without knowing exactly which rule is 'warn' by default.
    // Let's check some common ones or just verify the mapping logic worked.
    const allRules = configsWithRules.flatMap(c => Object.values(c.rules ?? {}))
    expect(allRules).not.toContain('warn')
  })

  it('should include Security plugin rules', () => {
    const config = eslintConfig({ optionals: [OptionalOption.Security] })
    const rules = extractRuleNames(config)
    expect(rules).toContain('security/detect-object-injection')
  })

  it('should include TanStack Query rules', () => {
    const config = eslintConfig({ optionals: [OptionalOption.TanstackQuery] })
    const rules = extractRuleNames(config)
    expect(rules).toContain('@tanstack/query/exhaustive-deps')
  })

  it('should include Perfectionist rules', () => {
    const config = eslintConfig({ optionals: [OptionalOption.Perfectionist] })
    const rules = extractRuleNames(config)
    expect(rules).toContain('perfectionist/sort-imports')
  })

  it('should include JSDoc rules', () => {
    const config = eslintConfig({ optionals: [OptionalOption.Jsdoc] })
    const rules = extractRuleNames(config)
    expect(rules).toContain('jsdoc/check-access')
  })
})
