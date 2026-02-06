import type { FlatConfigArray } from '../types.js'
import { ConfigOption, ReactConfigs } from '../types.js'

/**
 * Adds a specific configuration if the given option is present in the configs array.
 *
 * @param configs - An array of configuration options.
 * @param option - The option to check for.
 * @param configToAdd - The configuration to add if the option is present.
 * @returns The configuration to add if the option is present, otherwise an empty array.
 */
export const applyConfigIfOptionPresent = (
  configs: ConfigOption[],
  option: ConfigOption,
  configToAdd: FlatConfigArray
): FlatConfigArray => configs.includes(option) ? configToAdd : []

/**
 * Checks if the provided configs array includes any React-specific configurations.
 *
 * @param configs - An optional array of configuration options.
 * @returns True if any React configuration is found, false otherwise.
 */
export const hasReactConfig = (configs?: ConfigOption[]): boolean => {
  if (!configs) return false

  return ReactConfigs.some(reactConfig => configs.includes(reactConfig))
}
