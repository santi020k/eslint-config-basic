import { describe, expect, it } from 'vitest'

import {
  cypress,
  defineConfig,
  graphql,
  jest as jestConfig,
  testingLibrary
} from '@santi020k/eslint-config-basic'

describe('Public API Re-exports', () => {
  it('should expose defineConfig as the main config factory', async () => {
    expect(defineConfig).toBeDefined()
    expect(Array.isArray(await defineConfig({ detection: false }))).toBe(true)
  })

  it('should re-export all testing configs from the main package', () => {
    expect(typeof jestConfig).toBe("function")
    expect(typeof cypress).toBe("function")
    expect(typeof testingLibrary).toBe("function")
  })

  it('should re-export all format configs from the main package', () => {
    expect(typeof graphql).toBe("function")
  })
})
