import {
  type ConfigFeature,
  createModuleLoader,
  type Extension,
  type FlatConfigArray,
  type Format,
  type Library,
  resolveConfigFeatures,
  type Testing,
  type Tool
} from '@santi020k/eslint-config-core'

const loadModule = createModuleLoader(specifier => import.meta.resolve(specifier, import.meta.url))

interface FeaturePack {
  features?: ConfigFeature[]
}

const packCache = new Map<string, Promise<FeaturePack>>()

const loadFeaturePack = async (specifier: string): Promise<ConfigFeature[]> => {
  let pending = packCache.get(specifier)

  if (!pending) {
    pending = loadModule<FeaturePack>(specifier)
    packCache.set(specifier, pending)
  }

  try {
    const module = await pending

    if (!module.features) {
      throw new Error(`Installed package "${specifier}" does not export a feature registry.`)
    }

    return module.features
  } catch (error) {
    packCache.delete(specifier)

    throw new Error(
      `Unable to load optional feature pack "${specifier}". ` +
      'Install it for the selected options, or remove those options from defineConfig().',
      { cause: error }
    )
  }
}

const loadSelectedPacks = async (
  libraries: Library[],
  tools: Tool[],
  testing: Testing[],
  formats: Format[],
  extensions: Extension[]
): Promise<ConfigFeature[]> => (
  await Promise.all([
    extensions.length > 0 ? loadFeaturePack('@santi020k/eslint-config-extensions/registry') : [],
    formats.length > 0 ? loadFeaturePack('@santi020k/eslint-config-formats/registry') : [],
    libraries.length > 0 ? loadFeaturePack('@santi020k/eslint-config-libraries/registry') : [],
    testing.length > 0 ? loadFeaturePack('@santi020k/eslint-config-testing/registry') : [],
    tools.length > 0 ? loadFeaturePack('@santi020k/eslint-config-tools/registry') : []
  ])
).flat()

export const getIntegrationConfigs = async (
  libraries: Library[],
  tools: Tool[],
  testing: Testing[],
  formats: Format[],
  extensions: Extension[]
): Promise<FlatConfigArray> => {
  const selected = [...libraries, ...tools, ...testing, ...formats, ...extensions]

  if (selected.length === 0) return []

  const features = await loadSelectedPacks(libraries, tools, testing, formats, extensions)

  return resolveConfigFeatures(features, selected)
}

export const getPrettierConfig = async (tools: Tool[]): Promise<FlatConfigArray> => {
  if (tools.length === 0) return []

  const features = await loadFeaturePack('@santi020k/eslint-config-tools/registry')

  return resolveConfigFeatures(features, tools, 'finalizer')
}
