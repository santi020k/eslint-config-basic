import type { FlatConfigArray } from './types.js'

/**
 * Stable extension point used by optional feature packs.
 *
 * Feature packs own their dependency-specific factories while the composer
 * only understands this small, ecosystem-agnostic contract.
 */
export interface ConfigFeature {
  category: ConfigFeatureCategory
  create: () => FlatConfigArray | Promise<FlatConfigArray>
  id: string
  order: number
  phase?: ConfigFeaturePhase
}

export type ConfigFeatureCategory =
  | 'extension'
  | 'format'
  | 'library'
  | 'testing'
  | 'tool'

export type ConfigFeaturePhase = 'config' | 'finalizer'

export const resolveConfigFeatures = async (
  features: ConfigFeature[],
  selected: Iterable<string>,
  phase: ConfigFeaturePhase = 'config'
): Promise<FlatConfigArray> => {
  const selectedIds = new Set(selected)

  const matching = features
    .filter(feature => selectedIds.has(feature.id) && (feature.phase ?? 'config') === phase)
    .sort((left, right) => left.order - right.order)

  return (await Promise.all(
    matching.map(feature => Promise.resolve(feature.create()))
  )).flat()
}
