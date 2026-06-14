import { angularConfig } from '@santi020k/eslint-config-angular'
import { astroConfig } from '@santi020k/eslint-config-astro'
import { coreConfig } from '@santi020k/eslint-config-core'
import { expoConfig } from '@santi020k/eslint-config-expo'
import { hono as honoConfig } from '@santi020k/eslint-config-hono'
import { lit as litConfig } from '@santi020k/eslint-config-lit'
import { nestConfig } from '@santi020k/eslint-config-nest'
import { nextConfig } from '@santi020k/eslint-config-next'
import { nuxt as nuxtConfig } from '@santi020k/eslint-config-nuxt'
import { preactConfig } from '@santi020k/eslint-config-preact'
import { qwik as qwikConfig } from '@santi020k/eslint-config-qwik'
import { reactConfig } from '@santi020k/eslint-config-react'
import { reactRouter as reactRouterConfig } from '@santi020k/eslint-config-react-router'
import { slidev as slidevConfig } from '@santi020k/eslint-config-slidev'
import { solidConfig } from '@santi020k/eslint-config-solid'
import { svelteConfig } from '@santi020k/eslint-config-svelte'
import { tanstackStart as tanstackStartConfig } from '@santi020k/eslint-config-tanstack-start'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'
import { vite as viteConfig } from '@santi020k/eslint-config-vite'
import { vueConfig } from '@santi020k/eslint-config-vue'

import { describe, expect, test } from 'vitest'

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
      if (ruleName in rules) selected.set(ruleName, Reflect.get(rules, ruleName))
    }
  }

  return Object.fromEntries([...selected.entries()].sort(([a], [b]) => a.localeCompare(b)))
}

describe('Config Snapshots — Rule Names', () => {
  test('core config rules should match snapshot', () => {
    const rules = extractRuleNames(coreConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('typescript config rules should match snapshot', () => {
    const rules = extractRuleNames(typescriptConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('react config rules should match snapshot', () => {
    const rules = extractRuleNames(reactConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('preact config rules should match snapshot', () => {
    const rules = extractRuleNames(preactConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('next config rules should match snapshot', () => {
    const rules = extractRuleNames(nextConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('astro config rules should match snapshot', () => {
    const rules = extractRuleNames(astroConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('expo config rules should match snapshot', () => {
    const rules = extractRuleNames(expoConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('nest config rules should match snapshot', () => {
    const rules = extractRuleNames(nestConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('hono config rules should match snapshot', () => {
    const rules = extractRuleNames(honoConfig() as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('vue config rules should match snapshot', () => {
    const rules = extractRuleNames(vueConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('svelte config rules should match snapshot', () => {
    const rules = extractRuleNames(svelteConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('solid config rules should match snapshot', () => {
    const rules = extractRuleNames(solidConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('angular config rules should match snapshot', () => {
    const rules = extractRuleNames(angularConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('qwik config rules should match snapshot', () => {
    const rules = extractRuleNames(qwikConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('react-router config rules should match snapshot', () => {
    const rules = extractRuleNames(reactRouterConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('lit config rules should match snapshot', () => {
    const rules = extractRuleNames(litConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('nuxt config rules should match snapshot', () => {
    const rules = extractRuleNames(nuxtConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('tanstack-start config rules should match snapshot', () => {
    const rules = extractRuleNames(tanstackStartConfig as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('vite config rules should match snapshot', () => {
    const rules = extractRuleNames(viteConfig() as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })

  test('slidev config rules should match snapshot', () => {
    const rules = extractRuleNames(slidevConfig() as Record<string, unknown>[])

    expect(rules).toMatchSnapshot()
  })
})

describe('Config Snapshots — Entry Names', () => {
  test('core config entries should match snapshot', () => {
    const names = extractConfigNames(coreConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('typescript config entries should match snapshot', () => {
    const names = extractConfigNames(typescriptConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('react config entries should match snapshot', () => {
    const names = extractConfigNames(reactConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('preact config entries should match snapshot', () => {
    const names = extractConfigNames(preactConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('next config entries should match snapshot', () => {
    const names = extractConfigNames(nextConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('astro config entries should match snapshot', () => {
    const names = extractConfigNames(astroConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('expo config entries should match snapshot', () => {
    const names = extractConfigNames(expoConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('nest config entries should match snapshot', () => {
    const names = extractConfigNames(nestConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('hono config entries should match snapshot', () => {
    const names = extractConfigNames(honoConfig() as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('vue config entries should match snapshot', () => {
    const names = extractConfigNames(vueConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('svelte config entries should match snapshot', () => {
    const names = extractConfigNames(svelteConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('solid config entries should match snapshot', () => {
    const names = extractConfigNames(solidConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('angular config entries should match snapshot', () => {
    const names = extractConfigNames(angularConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('qwik config entries should match snapshot', () => {
    const names = extractConfigNames(qwikConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('react-router config entries should match snapshot', () => {
    const names = extractConfigNames(reactRouterConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('lit config entries should match snapshot', () => {
    const names = extractConfigNames(litConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('nuxt config entries should match snapshot', () => {
    const names = extractConfigNames(nuxtConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('tanstack-start config entries should match snapshot', () => {
    const names = extractConfigNames(tanstackStartConfig as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('vite config entries should match snapshot', () => {
    const names = extractConfigNames(viteConfig() as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })

  test('slidev config entries should match snapshot', () => {
    const names = extractConfigNames(slidevConfig() as Record<string, unknown>[])

    expect(names).toMatchSnapshot()
  })
})

describe('Config Snapshots — Critical Rule Entries', () => {
  test('core critical rule entries should match snapshot', () => {
    const entries = extractRuleEntries(coreConfig as Record<string, unknown>[], [
      'eqeqeq',
      'no-undef',
      'no-unused-vars',
      'simple-import-sort/imports'
    ])

    expect(entries).toMatchSnapshot()
  })

  test('typescript critical rule entries should match snapshot', () => {
    const entries = extractRuleEntries(typescriptConfig as Record<string, unknown>[], [
      '@typescript-eslint/no-explicit-any',
      '@typescript-eslint/no-unused-vars',
      '@typescript-eslint/consistent-type-imports',
      '@typescript-eslint/no-unsafe-assignment'
    ])

    expect(entries).toMatchSnapshot()
  })

  test('react critical rule entries should match snapshot', () => {
    const entries = extractRuleEntries(reactConfig as Record<string, unknown>[], [
      '@eslint-react/no-missing-key',
      '@eslint-react/rules-of-hooks',
      '@eslint-react/exhaustive-deps',
      'react-compiler/react-compiler'
    ])

    expect(entries).toMatchSnapshot()
  })

  test('preact critical rule entries should match snapshot', () => {
    const entries = extractRuleEntries(preactConfig as Record<string, unknown>[], [
      '@eslint-react/no-missing-key',
      '@eslint-react/rules-of-hooks',
      '@eslint-react/exhaustive-deps'
    ])

    expect(entries).toMatchSnapshot()
  })
})
