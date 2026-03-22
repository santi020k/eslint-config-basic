import {
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
 * Resolves an imported framework (either array or default export) into a config array.
 */
export const resolveFramework = (frameworkName: string, framework?: ImportedFramework): FlatConfigArray => {
  if (!framework) return []

  if (framework === true) {
    throw new TypeError(
      `Framework "${frameworkName}" requires an imported config. Install @santi020k/eslint-config-${frameworkName} and pass it via frameworks.${frameworkName}.`
    )
  }

  return Array.isArray(framework) ? framework : framework.default
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
