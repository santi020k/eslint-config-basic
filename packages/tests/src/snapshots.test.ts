import { describe, expect, it } from 'vitest'

import { angularConfig } from '@santi020k/eslint-config-angular'
import { astroConfig } from '@santi020k/eslint-config-astro'
import { coreConfig } from '@santi020k/eslint-config-core'
import { expoConfig } from '@santi020k/eslint-config-expo'
import { hono as honoConfig } from '@santi020k/eslint-config-hono'
import { nestConfig } from '@santi020k/eslint-config-nest'
import { nextConfig } from '@santi020k/eslint-config-next'
import { qwik as qwikConfig } from '@santi020k/eslint-config-qwik'
import { reactConfig } from '@santi020k/eslint-config-react'
import { remix as remixConfig } from '@santi020k/eslint-config-remix'
import { solidConfig } from '@santi020k/eslint-config-solid'
import { svelteConfig } from '@santi020k/eslint-config-svelte'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'
import { vueConfig } from '@santi020k/eslint-config-vue'

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

/**
 * Extract selected rule entries (severity + options) to catch changes that
 * won't appear in rule-name-only snapshots.
 */
const extractRuleEntries = (
  config: Record<string, unknown>[],
  ruleNames: string[]
): Record<string, unknown> => {
  const selected = new Map<string, unknown>()

  for (const entry of config) {
    const rules = entry.rules as Record<string, unknown> | undefined

    if (!rules) continue

    for (const ruleName of ruleNames) {
      if (ruleName in rules) selected.set(ruleName, rules[ruleName])
    }
  }

  return Object.fromEntries([...selected.entries()].sort(([a], [b]) => a.localeCompare(b)))
}

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

  it('nest config rules should match snapshot', () => {
    const rules = extractRuleNames(nestConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('hono config rules should match snapshot', () => {
    const rules = extractRuleNames(honoConfig() as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('vue config rules should match snapshot', () => {
    const rules = extractRuleNames(vueConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('svelte config rules should match snapshot', () => {
    const rules = extractRuleNames(svelteConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('solid config rules should match snapshot', () => {
    const rules = extractRuleNames(solidConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('angular config rules should match snapshot', () => {
    const rules = extractRuleNames(angularConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('qwik config rules should match snapshot', () => {
    const rules = extractRuleNames(qwikConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  it('remix config rules should match snapshot', () => {
    const rules = extractRuleNames(remixConfig as Record<string, unknown>[])

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

  it('nest config entries should match snapshot', () => {
    const names = extractConfigNames(nestConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('hono config entries should match snapshot', () => {
    const names = extractConfigNames(honoConfig() as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('vue config entries should match snapshot', () => {
    const names = extractConfigNames(vueConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('svelte config entries should match snapshot', () => {
    const names = extractConfigNames(svelteConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('solid config entries should match snapshot', () => {
    const names = extractConfigNames(solidConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('angular config entries should match snapshot', () => {
    const names = extractConfigNames(angularConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('qwik config entries should match snapshot', () => {
    const names = extractConfigNames(qwikConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  it('remix config entries should match snapshot', () => {
    const names = extractConfigNames(remixConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })
})

describe('Config Snapshots — Critical Rule Entries', () => {
  it('core critical rule entries should match snapshot', () => {
    const entries = extractRuleEntries(coreConfig as Record<string, unknown>[], [
      'eqeqeq',
      'no-undef',
      'no-unused-vars',
      'simple-import-sort/imports'
    ])

    expect(entries).toMatchSnapshot()
  })

  it('typescript critical rule entries should match snapshot', () => {
    const entries = extractRuleEntries(typescriptConfig as Record<string, unknown>[], [
      '@typescript-eslint/no-explicit-any',
      '@typescript-eslint/no-unused-vars',
      '@typescript-eslint/consistent-type-imports',
      '@typescript-eslint/no-unsafe-assignment'
    ])

    expect(entries).toMatchSnapshot()
  })

  it('react critical rule entries should match snapshot', () => {
    const entries = extractRuleEntries(reactConfig as Record<string, unknown>[], [
      'react/jsx-pascal-case',
      'react/self-closing-comp',
      'react-hooks/rules-of-hooks',
      'react-hooks/exhaustive-deps'
    ])

    expect(entries).toMatchSnapshot()
  })
})
