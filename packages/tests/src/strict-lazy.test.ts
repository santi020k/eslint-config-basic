import { defineConfig } from '@santi020k/eslint-config-basic'
import { describe, expect, test, vi } from 'vitest'

import { isMissingRequestedPackage } from '../../basic/src/optional-package-errors.js'

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

    const { defineConfig: defineLiteConfig } = await import('@santi020k/eslint-config-lite')

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

describe('optional package errors', () => {
  test('distinguishes the requested package from a missing transitive dependency', () => {
    const directError = Object.assign(
      new Error(
        'Cannot find package \'@santi020k/eslint-config-vite\' imported from /consumer/eslint.config.mjs'
      ),
      { code: 'ERR_MODULE_NOT_FOUND' }
    )
    const exportedSubpathError = Object.assign(
      new Error(
        'Cannot find package \'@santi020k/eslint-config-tools\' imported from /consumer/eslint.config.mjs'
      ),
      { code: 'ERR_MODULE_NOT_FOUND' }
    )
    const transitiveError = Object.assign(
      new Error(
        'Cannot find package \'incompatible-peer\' imported from /node_modules/@santi020k/eslint-config-vite/dist/index.js'
      ),
      { code: 'ERR_MODULE_NOT_FOUND' }
    )

    expect(isMissingRequestedPackage(directError, '@santi020k/eslint-config-vite')).toBe(true)
    expect(isMissingRequestedPackage(
      exportedSubpathError,
      '@santi020k/eslint-config-tools/registry'
    )).toBe(true)
    expect(isMissingRequestedPackage(transitiveError, '@santi020k/eslint-config-vite')).toBe(false)
  })
})

describe('Astro Doctor lazy loading', () => {
  test('does not load Astro Doctor for non-Astro configurations', async () => {
    vi.resetModules()
    vi.doMock('@santi020k/eslint-plugin-astro-doctor', () => {
      throw new Error('Module should not load')
    })

    const { defineConfig: isolatedDefineConfig } = await import('@santi020k/eslint-config-basic')

    await expect(isolatedDefineConfig(baseOptions)).resolves.toBeDefined()
    vi.doUnmock('@santi020k/eslint-plugin-astro-doctor')
  })

  test('loads Astro Doctor when it is explicitly enabled', async () => {
    const config = await defineConfig({
      ...baseOptions,
      extensions: ['astro-doctor'],
      frameworks: { astro: true }
    })

    expect(config.some(entry => entry.name === 'eslint-config-integrations/astro-doctor')).toBe(true)
  })
})
