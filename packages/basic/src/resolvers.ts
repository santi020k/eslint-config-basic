import { type FrameworkOptions, getBundledFrameworkConfig } from './frameworks.js'

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

/**
 * Resolves an imported framework (either array, object with default, or factory function) into a config array.
 */
export const resolveFramework = (
  frameworkName: DetectedFrameworkName,
  framework?: ImportedFramework,
  options?: FrameworkOptions
): FlatConfigArray => {
  if (!framework) return []

  if ((framework as unknown) === true) {
    return getBundledFrameworkConfig(frameworkName, options)
  }

  // Handle factory functions directly
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
    case Preset.Basic:
      return { runtime: Runtime.Universal }

    case Preset.Node:
      return {
        typescript: true,
        runtime: Runtime.Node
      }

    case Preset.Browser:
      return {
        typescript: true,
        runtime: Runtime.Browser
      }

    case Preset.Worker:
      return {
        typescript: true,
        runtime: Runtime.Worker
      }

    case Preset.Library:
      return {
        typescript: true,
        runtime: Runtime.Node,
        tools: [Tool.Prettier],
        extensions: [Extension.BestPractices]
      }

    case Preset.App:
      return {
        typescript: true,
        runtime: Runtime.Browser,
        tools: [Tool.Prettier],
        testing: [Testing.Vitest]
      }

    case Preset.CI:
      return {
        typescript: true,
        runtime: Runtime.Universal,
        tools: [Tool.Prettier],
        extensions: [Extension.BestPractices],
        strict: 'ci'
      }

    case Preset.Monorepo:
      return {
        typescript: true,
        runtime: Runtime.Universal,
        tools: [Tool.Prettier],
        extensions: [Extension.BestPractices]
      }

    case Preset.All:
      return {
        typescript: true,
        libraries: Object.values(Library),
        tools: Object.values(Tool),
        testing: Object.values(Testing),
        formats: Object.values(Format),
        extensions: Object.values(Extension),
        runtime: Runtime.Universal
      }

    default:
      return {}
  }
}
