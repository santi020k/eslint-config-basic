import { describe, expect, it } from 'vitest'

import { astroConfig } from '@santi020k/eslint-config-astro'
import { coreConfig } from '@santi020k/eslint-config-core'
import { expoConfig } from '@santi020k/eslint-config-expo'
import { nextConfig } from '@santi020k/eslint-config-next'
import { reactConfig } from '@santi020k/eslint-config-react'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'

/**
 * Extract rule names from a config array for snapshot comparison.
 * This captures the "shape" of each config — when plugin updates
 * add or remove rules, these snapshots will catch it.
 */
const extractRuleNames = (config: Record<string, unknown>[]): string[] => {
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
 * Extract config entry names from a config array.
 */
const extractConfigNames = (config: Record<string, unknown>[]): string[] => config
  .map(entry => entry.name as string | undefined)
  .filter((name): name is string => typeof name === 'string')
  .sort()

describe('Config Snapshots — Rule Names', () => {
  it('core config rules should match snapshot', () => {
    const rules = extractRuleNames(coreConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('typescript config rules should match snapshot', () => {
    const rules = extractRuleNames(typescriptConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('react config rules should match snapshot', () => {
    const rules = extractRuleNames(reactConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('next config rules should match snapshot', () => {
    const rules = extractRuleNames(nextConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('astro config rules should match snapshot', () => {
    const rules = extractRuleNames(astroConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('expo config rules should match snapshot', () => {
    const rules = extractRuleNames(expoConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })
})

describe('Config Snapshots — Entry Names', () => {
  it('core config entries should match snapshot', () => {
    const names = extractConfigNames(coreConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('typescript config entries should match snapshot', () => {
    const names = extractConfigNames(typescriptConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('react config entries should match snapshot', () => {
    const names = extractConfigNames(reactConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('next config entries should match snapshot', () => {
    const names = extractConfigNames(nextConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('astro config entries should match snapshot', () => {
    const names = extractConfigNames(astroConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('expo config entries should match snapshot', () => {
    const names = extractConfigNames(expoConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })
})
