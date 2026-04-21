import { type EslintConfigOptions, ReactConfigKeys } from '../types.js'

/**
 * Checks if the provided EslintConfigOptions includes any React-specific configurations.
 *
 * @param options - ESLint configuration options.
 * @returns True if any React configuration is detected, false otherwise.
 */
export const hasReactConfig = (options?: EslintConfigOptions): boolean => {
  if (!options) return false

  const frameworks = options.frameworks ?? {}

  return ReactConfigKeys.some(key => {
    const value = frameworks[key as keyof typeof frameworks]

    return value !== undefined
  })
}

export * from './detection.js'
