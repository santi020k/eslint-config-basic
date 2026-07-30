import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

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

// Keeping import() in this module preserves the correct package base when
// multiple optional integrations load concurrently.
const dynamicImport = async (specifier: string): Promise<unknown> => import(/* @vite-ignore */ specifier)
const req = createRequire(import.meta.url)

const resolveSpecifier = (specifier: string): string => {
  let resolved = specifier

  try {
    resolved = pathToFileURL(req.resolve(specifier)).href
  } catch {
    // Ignore and let dynamicImport throw natural error
  }

  return resolved
}

export const loadDefault = async <T = unknown>(specifier: string): Promise<T> => {
  const module = await dynamicImport(resolveSpecifier(specifier))

  if (hasDefaultExport(module)) {
    return (module.default ?? module) as T
  }

  return module as T
}

export const loadModule = async <T = unknown>(specifier: string): Promise<T> =>
  await dynamicImport(resolveSpecifier(specifier)) as T

/**
 * Keeps optional integrations import-safe for consumers that do not enable them.
 * @param name - The name of the integration
 * @param load - Function to load the configuration
 * @returns A function that resolves the configuration array lazily
 */
export const defineLazyConfig = (
  name: string,
  load: () => ConfigArray | Promise<ConfigArray>
): () => Promise<ConfigArray> => {
  let config: ConfigArray | undefined

  return async (): Promise<ConfigArray> => {
    try {
      config ??= await load()

      return config
    } catch (error) {
      throw new Error(
        `Unable to load optional ESLint config "${name}". ` +
        'Install the peer dependencies for that integration or remove it from your defineConfig options. ' +
        `Original error: ${getErrorMessage(error)}`, { cause: error }
      )
    }
  }
}
