import { createRequire } from 'node:module'

import type { TSESLint } from '@typescript-eslint/utils'

const require = createRequire(import.meta.url)

type ConfigArray = TSESLint.FlatConfig.ConfigArray

type FlatConfig = TSESLint.FlatConfig.Config

export type FlatPlugin = NonNullable<FlatConfig['plugins']>[string]
export type FlatParser = NonNullable<FlatConfig['languageOptions']>['parser']
export type FlatRules = NonNullable<FlatConfig['rules']>
export type ConfigWithRules = FlatConfig & { rules?: FlatRules }
export type PluginWithConfigs<ConfigName extends string = string> = FlatPlugin & {
  configs: Record<ConfigName, ConfigWithRules>
}

const getErrorMessage = (error: unknown): string => error instanceof Error ?
  error.message :
  String(error)

const hasDefaultExport = (module: unknown): module is { default?: unknown } => (
  typeof module === 'object' &&
  module !== null &&
  'default' in module
)

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const loadDefault = <T = unknown>(specifier: string): T => {
  const module = require(specifier) as unknown

  if (hasDefaultExport(module)) {
    return (module.default ?? module) as T
  }

  return module as T
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const loadModule = <T = unknown>(specifier: string): T => require(specifier) as T

/**
 * Keeps optional integrations import-safe for consumers that do not enable them.
 */
export const defineLazyConfig = (
  name: string,
  load: () => ConfigArray
): ConfigArray => {
  let config: ConfigArray | undefined

  const getConfig = (): ConfigArray => {
    try {
      config ??= load()

      return config
    } catch (error) {
      throw new Error(
        `Unable to load optional ESLint config "${name}". ` +
        'Install the peer dependencies for that integration or remove it from your eslintConfig options. ' +
        `Original error: ${getErrorMessage(error)}`, { cause: error }
      )
    }
  }

  return new Proxy([], {
    get: (_target, property, receiver) => Reflect.get(getConfig(), property, receiver),
    getOwnPropertyDescriptor: (_target, property) => Reflect.getOwnPropertyDescriptor(getConfig(), property),
    has: (_target, property) => Reflect.has(getConfig(), property),
    ownKeys: () => Reflect.ownKeys(getConfig())
  })
}
