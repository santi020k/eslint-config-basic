import { defineConfig } from '@santi020k/eslint-config-basic'

import { describe, expect, test, vi } from 'vitest'

import { getEffectiveRuleValue } from './test-utils.js'

const noDetectRootDir = '/__eslint-config_basic_strict_lazy_tests_no_detect__'

const baseOptions = {
  autoFrameworks: false,
  detection: false,
  detectRootDir: noDetectRootDir,
  extensions: [],
  formats: [],
  frameworks: {},
  libraries: [],
  optionMergeStrategy: 'replace' as const,
  testing: [],
  tools: [],
  typescript: false
}

describe('strict mode escalation', () => {
  test('strict true escalates warning-level rules to errors', async () => {
    const config = await defineConfig({
      ...baseOptions,
      strict: true
    })

    expect(getEffectiveRuleValue(config, '@stylistic/quotes')).toEqual(['error', 'single'])
  })

  test('strict ci escalates warning-level rules to errors', async () => {
    const config = await defineConfig({
      ...baseOptions,
      strict: 'ci'
    })

    expect(getEffectiveRuleValue(config, '@stylistic/quotes')).toEqual(['error', 'single'])
  })
})

describe('lazy framework loading', () => {
  test('lite package wraps missing optional framework packages with a friendly error', async () => {
    vi.resetModules()
    vi.doMock('@santi020k/eslint-config-vite', () => {
      throw new Error('Module not found: @santi020k/eslint-config-vite')
    })

    const litePackage = '@santi020k/eslint-config-lite'
    const { defineConfig: defineLiteConfig } = await import(litePackage)

    let error: unknown

    try {
      await defineLiteConfig({
        ...baseOptions,
        frameworks: { vite: true }
      })
    } catch (error_) {
      error = error_
    }

    expect(error).toBeInstanceOf(Error)
    expect((error as Error).message).toContain('Unable to load optional framework config "vite"')
    expect((error as Error).message).not.toContain('Module not found')

    vi.doUnmock('@santi020k/eslint-config-vite')
  })
})
