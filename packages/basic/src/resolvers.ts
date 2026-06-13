import {
  type DetectedFrameworkName,
  type EslintConfigOptions,
  Extension,
  type FlatConfigArray,
  Format,
  type ImportedFramework,
  Library,
  Preset,
  Runtime,
  Testing,
  Tool
} from '@santi020k/eslint-config-core'

import { type FrameworkOptions, getBundledFrameworkConfig } from './frameworks.js'

/**
 * Resolves an imported framework (either array, object with default, or factory function) into a config array.
 * Bundled configs (`true`) and async factories are loaded lazily, so framework
 * packages are only imported when actually enabled.
 */
export const resolveFramework = async (
  frameworkName: DetectedFrameworkName,
  framework?: ImportedFramework,
  options?: FrameworkOptions
): Promise<FlatConfigArray> => {
  if (!framework) return []

  if ((framework as unknown) === true) {
    return getBundledFrameworkConfig(frameworkName, options)
  }

  // Handle factory functions directly (sync or async)
  if (typeof framework === 'function') {
    return (framework)(options)
  }

  // Handle modules with default exports
  if (typeof framework === 'object' && 'default' in framework) {
    if (typeof framework.default === 'function') {
      return (framework.default)(options)
    }

    return framework.default
  }

  // Handle config arrays directly
  if (Array.isArray(framework)) return framework

  throw new TypeError(
    `[ESLint Basic] Invalid framework config for "${frameworkName}". ` +
    'Use true to enable the bundled config, or pass a config array/factory/default export.'
  )
}

/**
 * Resolves a preset into options
 */
export const resolvePreset = (preset: Preset): Partial<EslintConfigOptions> => {
  switch (preset) {
    case Preset.All:
      return {
        extensions: Object.values(Extension),
        formats: Object.values(Format),
        libraries: Object.values(Library),
        runtime: Runtime.Universal,
        testing: Object.values(Testing),
        tools: Object.values(Tool),
        typescript: true
      }

    case Preset.App:
      return {
        runtime: Runtime.Browser,
        testing: [Testing.Vitest],
        tools: [Tool.Prettier],
        typescript: true
      }

    case Preset.Basic:
      return { runtime: Runtime.Universal }

    case Preset.Browser:
      return {
        runtime: Runtime.Browser,
        typescript: true
      }

    case Preset.CI:
      return {
        extensions: [Extension.BestPractices],
        runtime: Runtime.Universal,
        strict: 'ci',
        tools: [Tool.Prettier],
        typescript: true
      }

    case Preset.Library:
      return {
        extensions: [Extension.BestPractices],
        runtime: Runtime.Node,
        tools: [Tool.Prettier],
        typescript: true
      }

    case Preset.Monorepo:
      return {
        extensions: [Extension.BestPractices],
        runtime: Runtime.Universal,
        tools: [Tool.Prettier],
        typescript: true
      }

    case Preset.Node:
      return {
        runtime: Runtime.Node,
        typescript: true
      }

    case Preset.Worker:
      return {
        runtime: Runtime.Worker,
        typescript: true
      }

    default:
      return {}
  }
}
