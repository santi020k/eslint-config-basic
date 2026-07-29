import type { ConfigInput, EslintConfigOptions, FlatConfigArray } from '@santi020k/eslint-config-core'

const DEFINE_CONFIG_METADATA = Symbol.for('@santi020k/eslint-config-basic/define-config-metadata')

export interface DefineConfigMetadata {
  extraConfigs: ConfigInput[]
  options?: EslintConfigOptions
}

type ConfigWithMetadata = FlatConfigArray & {
  [DEFINE_CONFIG_METADATA]?: DefineConfigMetadata
}

export const attachDefineConfigMetadata = (
  config: FlatConfigArray,
  metadata: DefineConfigMetadata
): FlatConfigArray => {
  Object.defineProperty(config, DEFINE_CONFIG_METADATA, {
    configurable: false,
    enumerable: false,
    value: metadata,
    writable: false
  })

  return config
}

export const getDefineConfigMetadata = (config: unknown): DefineConfigMetadata | undefined => (
  // eslint-disable-next-line security/detect-object-injection -- shared symbol is an internal fixed metadata key
  Array.isArray(config) ? (config as ConfigWithMetadata)[DEFINE_CONFIG_METADATA] : undefined
)
