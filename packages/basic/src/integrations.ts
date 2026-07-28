import {
  createModuleLoader,
  type Extension,
  type FlatConfigArray,
  type Format,
  type Library,
  type Testing,
  Tool
} from '@santi020k/eslint-config-core'

const loadModule = createModuleLoader(specifier => import.meta.resolve(specifier, import.meta.url))

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

let integrationsModule: Promise<IntegrationModule> | undefined

const loadIntegrations = async (): Promise<IntegrationModule> => {
  integrationsModule ??= loadModule<IntegrationModule>('@santi020k/eslint-config-integrations')

  try {
    return await integrationsModule
  } catch (error) {
    integrationsModule = undefined

    throw new Error(
      'Unable to load optional package "@santi020k/eslint-config-integrations". ' +
      'Install it for integrations, or remove the selected integration options.', { cause: error }
    )
  }
}

export const getIntegrationConfigs = async (
  libraries: Library[],
  tools: Tool[],
  testing: Testing[],
  formats: Format[],
  extensions: Extension[]
): Promise<FlatConfigArray> => {
  if (
    libraries.length === 0 &&
    tools.length === 0 &&
    testing.length === 0 &&
    formats.length === 0 &&
    extensions.length === 0
  ) return []

  const module = await loadIntegrations()

  if (!module.getIntegrationConfigs) {
    throw new Error(
      'Installed "@santi020k/eslint-config-integrations" is incompatible. Update it to v3 or newer.'
    )
  }

  return module.getIntegrationConfigs(libraries, tools, testing, formats, extensions)
}

export const getPrettierConfig = async (tools: Tool[]): Promise<FlatConfigArray> => {
  if (!tools.includes(Tool.Prettier)) return []

  const module = await loadIntegrations()

  if (!module.getPrettierConfig) {
    throw new Error(
      'Installed "@santi020k/eslint-config-integrations" is incompatible. Update it to v3 or newer.'
    )
  }

  return module.getPrettierConfig(tools)
}
