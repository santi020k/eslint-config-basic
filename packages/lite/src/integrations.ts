import {
  Extension,
  type FlatConfigArray,
  type Format,
  type Library,
  type Testing,
  Tool
} from '@santi020k/eslint-config-core'

import { loadModule } from './lazy.js'

interface IntegrationModule {
  getIntegrationConfigs?: (
    libraries: Library[],
    tools: Tool[],
    testing: Testing[],
    formats: Format[],
    extensions: Extension[]
  ) => Promise<FlatConfigArray>
  getPrettierConfig?: (tools: Tool[]) => Promise<FlatConfigArray>
}

const hasRequestedIntegrations = (
  libraries: Library[],
  tools: Tool[],
  testing: Testing[],
  formats: Format[],
  extensions: Extension[]
): boolean => (
  libraries.length > 0 ||
  tools.length > 0 ||
  testing.length > 0 ||
  formats.length > 0 ||
  extensions.some(extension => extension !== Extension.Boundaries)
)

let integrationsModule: Promise<IntegrationModule> | undefined

const loadIntegrations = async (): Promise<IntegrationModule> => {
  integrationsModule ??= loadModule<IntegrationModule>('@santi020k/eslint-config-integrations')

  try {
    return await integrationsModule
  } catch (error) {
    throw new Error(
      'Unable to load optional package "@santi020k/eslint-config-integrations". ' +
      'Install it when using lite package integrations, or remove the selected integrations from your eslintConfig options.',
      { cause: error }
    )
  }
}

/**
 * Gets integration configs from the optional integrations package.
 */
export const getIntegrationConfigs = async (
  libraries: Library[],
  tools: Tool[],
  testing: Testing[],
  formats: Format[],
  extensions: Extension[]
): Promise<FlatConfigArray> => {
  if (!hasRequestedIntegrations(libraries, tools, testing, formats, extensions)) return []

  const module = await loadIntegrations()

  if (!module.getIntegrationConfigs) {
    throw new Error(
      'Installed "@santi020k/eslint-config-integrations" does not export getIntegrationConfigs. ' +
      'Update it to a compatible version.'
    )
  }

  return module.getIntegrationConfigs(libraries, tools, testing, formats, extensions)
}

/**
 * Returns the Prettier configuration if selected.
 */
export const getPrettierConfig = async (tools: Tool[]): Promise<FlatConfigArray> => {
  if (!tools.includes(Tool.Prettier)) return []

  const module = await loadIntegrations()

  if (!module.getPrettierConfig) {
    throw new Error(
      'Installed "@santi020k/eslint-config-integrations" does not export getPrettierConfig. ' +
      'Update it to a compatible version.'
    )
  }

  return module.getPrettierConfig(tools)
}
