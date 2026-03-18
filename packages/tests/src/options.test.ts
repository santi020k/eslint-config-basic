import { describe, expect, it } from 'vitest'

import { extractConfigNames, extractRuleNames } from './test-utils.js'

import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

describe('Deep Rule Assertions (#5)', () => {
  it('should include React-specific rules when React is enabled', () => {
    const config = eslintConfig({ config: [ConfigOption.React] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')

    expect(rules).toContain('react/self-closing-comp')

    expect(rules).toContain('react-hooks/exhaustive-deps')
  })

  it('should include TypeScript rules when Ts is enabled', () => {
    const config = eslintConfig({ config: [ConfigOption.Ts] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('@typescript-eslint/no-explicit-any')

    expect(rules).toContain('@typescript-eslint/no-unused-vars')
  })

  it('should include core stylistic rules in all configs', () => {
    const config = eslintConfig({ config: [] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('@stylistic/indent')

    expect(rules).toContain('@stylistic/quotes')

    expect(rules).toContain('@stylistic/semi')
  })

  it('should include config entry names', () => {
    const config = eslintConfig({ config: [ConfigOption.Ts] })
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('eslint-config/custom-rules')

    expect(names).toContain('eslint-config-typescript/rules')
  })

  it('should NOT include React rules when only Ts is enabled', () => {
    const config = eslintConfig({ config: [ConfigOption.Ts] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).not.toContain('react/jsx-pascal-case')

    expect(rules).not.toContain('react-hooks/exhaustive-deps')
  })

  it('should include unicorn rules when Unicorn optional is enabled', () => {
    const config = eslintConfig({
      config: [],
      optionals: [OptionalOption.Unicorn]
    })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('unicorn/better-regex')

    expect(rules).toContain('unicorn/prefer-array-flat-map')
  })

  it('should include sonarjs rules when Sonarjs optional is enabled', () => {
    const config = eslintConfig({
      config: [],
      optionals: [OptionalOption.Sonarjs]
    })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('sonarjs/no-duplicate-string')

    expect(rules).toContain('sonarjs/cognitive-complexity')
  })

  it('should include prettier config when Prettier optional is enabled', () => {
    const config = eslintConfig({
      config: [],
      optionals: [OptionalOption.Prettier]
    })
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('eslint-config/prettier')
  })

  it('should include regexp rules when Regexp optional is enabled', () => {
    const config = eslintConfig({
      config: [],
      optionals: [OptionalOption.Regexp]
    })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('regexp/no-super-linear-backtracking')

    expect(rules).toContain('regexp/no-useless-escape')
  })

  it('should include Vue rules when Vue is enabled', () => {
    const config = eslintConfig({ config: [ConfigOption.Vue] })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('vue/multi-word-component-names')

    expect(rules).toContain('vue/html-self-closing')
  })

  it('should include playwright rules when Playwright optional is enabled', () => {
    const config = eslintConfig({
      config: [],
      optionals: [OptionalOption.Playwright]
    })
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('optionals/playwright')
  })
})
