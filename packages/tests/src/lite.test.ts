import * as basic from '@santi020k/eslint-config-basic'
import * as lite from '@santi020k/eslint-config-lite'

import { describe, expect, test } from 'vitest'

describe('Lite compatibility package', () => {
  test('re-exports the Basic public API', () => {
    expect(Object.keys(lite).sort()).toEqual(Object.keys(basic).sort())
  })

  test('shares the Basic composer implementation', async () => {
    expect(lite.defineConfig).toBe(basic.defineConfig)
    expect(await lite.defineConfig({ detection: false })).toEqual(
      await basic.defineConfig({ detection: false })
    )
  })
})
