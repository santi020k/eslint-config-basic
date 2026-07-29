import { type ConfigFeature,resolveConfigFeatures } from '@santi020k/eslint-config-core'

import { describe, expect, test } from 'vitest'

describe('feature adapter contract', () => {
  const features: ConfigFeature[] = [
    {
      category: 'tool',
      create: () => [{ name: 'late' }],
      id: 'late',
      order: 20
    },
    {
      category: 'library',
      create: async () => [{ name: 'early' }],
      id: 'early',
      order: 10
    },
    {
      category: 'tool',
      create: () => [{ name: 'final' }],
      id: 'final',
      order: 1000,
      phase: 'finalizer'
    }
  ]

  test('selects and orders normal feature configs independently of registry order', async () => {
    const configs = await resolveConfigFeatures(features, ['late', 'early'])

    expect(configs.map(config => config.name)).toEqual(['early', 'late'])
  })

  test('keeps finalizers out of the normal phase', async () => {
    await expect(resolveConfigFeatures(features, ['final'])).resolves.toEqual([])
    await expect(resolveConfigFeatures(features, ['final'], 'finalizer')).resolves.toEqual([
      { name: 'final' }
    ])
  })
})
