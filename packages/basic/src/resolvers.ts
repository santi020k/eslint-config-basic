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
export const resolveFramework = (framework?: ImportedFramework): FlatConfigArray => {
  if (!framework || typeof framework === 'boolean') return []

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
        frameworks: { react: true },
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
        runtime: Runtime.Universal,
        frameworks: {
          react: true,
          next: true,
          astro: true,
          vue: true,
          svelte: true,
          solid: true,
          angular: true
        }
      }

    default:
      return {}
  }
}
