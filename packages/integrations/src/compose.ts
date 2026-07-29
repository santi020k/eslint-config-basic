import {
  type ConfigFeature,
  type Extension,
  type FlatConfigArray,
  type Format,
  type Library,
  resolveConfigFeatures,
  type Testing,
  type Tool
} from '@santi020k/eslint-config-core'
import { features as extensionFeatures } from '@santi020k/eslint-config-extensions/registry'
import { features as formatFeatures } from '@santi020k/eslint-config-formats/registry'
import { features as libraryFeatures } from '@santi020k/eslint-config-libraries/registry'
import { features as testingFeatures } from '@santi020k/eslint-config-testing/registry'
import { features as toolFeatures } from '@santi020k/eslint-config-tools/registry'

const features: ConfigFeature[] = [
  ...extensionFeatures,
  ...formatFeatures,
  ...libraryFeatures,
  ...testingFeatures,
  ...toolFeatures
]

export const getIntegrationConfigs = async (
  libraries: Library[],
  tools: Tool[],
  testing: Testing[],
  formats: Format[],
  extensions: Extension[]
): Promise<FlatConfigArray> => resolveConfigFeatures(
  features,
  [...libraries, ...tools, ...testing, ...formats, ...extensions]
)

export const getPrettierConfig = async (tools: Tool[]): Promise<FlatConfigArray> => (
  resolveConfigFeatures(toolFeatures, tools, 'finalizer')
)
