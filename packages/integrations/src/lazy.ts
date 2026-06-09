import type { TSESLint } from '@typescript-eslint/utils'

export type ConfigWithRules = FlatConfig & { rules?: FlatRules }

export type FlatParser = NonNullable<FlatConfig['languageOptions']>['parser']

export type FlatPlugin = NonNullable<FlatConfig['plugins']>[string]
export type FlatRules = NonNullable<FlatConfig['rules']>
export type PluginWithConfigs<ConfigName extends string = string> = FlatPlugin & {
  configs: Record<ConfigName, ConfigWithRules>
}

type ConfigArray = TSESLint.FlatConfig.ConfigArray

type FlatConfig = TSESLint.FlatConfig.Config

const getErrorMessage = (error: unknown): string => error instanceof Error ?
  error.message :
  String(error)

const hasDefaultExport = (module: unknown): module is { default?: unknown } => (
  typeof module === 'object' &&
  module !== null &&
  'default' in module
)

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const loadDefault = async <T = unknown>(specifier: string): Promise<T> => {
  const module = await import(specifier)

  if (hasDefaultExport(module)) {
    return (module.default ?? module) as T
  }

  return module as T
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const loadModule = async <T = unknown>(specifier: string): Promise<T> => await import(specifier) as T

/**
 * Keeps optional integrations import-safe for consumers that do not enable them.
 */
export const defineLazyConfig = (
  name: string,
  load: () => ConfigArray | Promise<ConfigArray>
): Promise<ConfigArray> => {
  let config: ConfigArray | undefined

  const getConfig = async (): Promise<ConfigArray> => {
    try {
      config ??= await load()

      return config
    } catch (error) {
      throw new Error(
        `Unable to load optional ESLint config "${name}". ` +
        'Install the peer dependencies for that integration or remove it from your eslintConfig options. ' +
        `Original error: ${getErrorMessage(error)}`, { cause: error }
      )
    }
  }

  return getConfig()
}
