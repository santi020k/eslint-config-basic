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
 * Extract rule names for semantic package contracts.
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

interface RuleContract {
  config: Record<string, unknown>[]
  name: string
  requiredPrefixes?: string[]
  requiredRules?: string[]
}

const ruleContracts: RuleContract[] = [
  { config: coreConfig as Record<string, unknown>[], name: 'core', requiredRules: ['eqeqeq', 'no-unused-vars'] },
  { config: typescriptConfig as Record<string, unknown>[], name: 'typescript', requiredPrefixes: ['@typescript-eslint/'] },
  { config: reactConfig as Record<string, unknown>[], name: 'react', requiredPrefixes: ['@eslint-react/', 'react-compiler/'] },
  { config: preactConfig as Record<string, unknown>[], name: 'preact', requiredPrefixes: ['@eslint-react/'] },
  { config: nextConfig as Record<string, unknown>[], name: 'next', requiredPrefixes: ['@next/next/'] },
  { config: astroConfig as Record<string, unknown>[], name: 'astro', requiredPrefixes: ['astro/'] },
  { config: expoConfig as Record<string, unknown>[], name: 'expo', requiredPrefixes: ['expo/'] },
  { config: nestConfig as Record<string, unknown>[], name: 'nest', requiredPrefixes: ['@darraghor/nestjs-typed/'] },
  { config: honoConfig() as Record<string, unknown>[], name: 'hono', requiredRules: ['n/no-process-env'] },
  { config: vueConfig as Record<string, unknown>[], name: 'vue', requiredPrefixes: ['vue/'] },
  { config: svelteConfig as Record<string, unknown>[], name: 'svelte', requiredPrefixes: ['svelte/'] },
  { config: solidConfig as Record<string, unknown>[], name: 'solid', requiredPrefixes: ['solid/'] },
  { config: angularConfig as Record<string, unknown>[], name: 'angular', requiredPrefixes: ['@angular-eslint/'] },
  { config: qwikConfig as Record<string, unknown>[], name: 'qwik', requiredPrefixes: ['qwik/'] },
  { config: reactRouterConfig as Record<string, unknown>[], name: 'react-router', requiredPrefixes: ['jsx-a11y/'] },
  { config: litConfig as Record<string, unknown>[], name: 'lit', requiredPrefixes: ['lit/', 'wc/'] },
  { config: nuxtConfig as Record<string, unknown>[], name: 'nuxt', requiredPrefixes: ['nuxt/'] },
  {
    config: tanstackStartConfig as Record<string, unknown>[],
    name: 'tanstack-start',
    requiredPrefixes: ['@tanstack/query/', '@tanstack/router/']
  },
  { config: viteConfig() as Record<string, unknown>[], name: 'vite', requiredRules: ['n/no-unpublished-import'] },
  { config: slidevConfig() as Record<string, unknown>[], name: 'slidev', requiredRules: ['n/no-unpublished-import'] }
]

describe('Config Rule Contracts', () => {
  test.each(ruleContracts)('$name exposes its framework rule families', ({ config, requiredPrefixes = [], requiredRules = [] }) => {
    const rules = extractRuleNames(config)

    expect(rules).toEqual(expect.arrayContaining(requiredRules))

    for (const prefix of requiredPrefixes) {
      expect(rules.some(rule => rule.startsWith(prefix)), `missing rule family ${prefix}`).toBe(true)
    }
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
