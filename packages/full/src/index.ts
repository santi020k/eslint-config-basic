import {
  defineConfig as basicDefineConfig,
  type EslintConfigArray as BasicEslintConfigArray
} from '@santi020k/eslint-config-basic'

// eslint-disable-next-line import/export -- Full intentionally replaces Basic's defineConfig result boundary.
export * from '@santi020k/eslint-config-basic'
export * from '@santi020k/eslint-config-extensions'
export * from '@santi020k/eslint-config-formats'
export * from '@santi020k/eslint-config-libraries'
export * from '@santi020k/eslint-config-testing'
export * from '@santi020k/eslint-config-tools'

/** Portable public result type returned by Full's re-exported composer. */
export interface EslintConfigArray extends BasicEslintConfigArray {
  length: number
}

type ConfigComposer = (
  ...args: Parameters<typeof basicDefineConfig>
) => Promise<EslintConfigArray>

// eslint-disable-next-line import/export -- Full intentionally narrows Basic's composer result type.
export const defineConfig: ConfigComposer = basicDefineConfig
