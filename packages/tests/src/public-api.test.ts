import { describe, expect, it } from 'vitest'

import {
  cypress,
  defineConfig,
  eslintConfig,
  graphql,
  jest as jestConfig,
  testingLibrary
} from '@santi020k/eslint-config-basic'

describe('Public API Re-exports', () => {
  it('should expose defineConfig as the main config factory', () => {
    expect(defineConfig).toBe(eslintConfig)
    expect(Array.isArray(defineConfig({ detection: false }))).toBe(true)
  })

  it('should re-export all testing configs from the main package', () => {
    expect(Array.isArray(jestConfig)).toBe(true)
    expect(Array.isArray(cypress)).toBe(true)
    expect(Array.isArray(testingLibrary)).toBe(true)
  })

  it('should re-export all format configs from the main package', () => {
    expect(Array.isArray(graphql)).toBe(true)
  })
})
