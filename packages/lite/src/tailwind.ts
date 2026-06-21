import type { TailwindOptions } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

const buildUnknownClassOptions = (tailwindOptions: TailwindOptions): Record<string, string | string[]> => {
  const unknownClassOptions: Record<string, string | string[]> = {}

  if (tailwindOptions.entryPoint) unknownClassOptions.entryPoint = tailwindOptions.entryPoint

  if (tailwindOptions.ignore?.length) unknownClassOptions.ignore = tailwindOptions.ignore

  return unknownClassOptions
}

const createNoUnknownClassesRule = (
  noUnknownClasses: TailwindOptions['noUnknownClasses'],
  unknownClassOptions: Record<string, string | string[]>
): TSESLint.FlatConfig.RuleEntry | undefined => {
  const hasUnknownClassOptions = Object.keys(unknownClassOptions).length > 0

  if (!hasUnknownClassOptions && noUnknownClasses === undefined) return undefined

  const severity = noUnknownClasses ?? 'error'

  if (severity === false) return 'off'

  return hasUnknownClassOptions ? [severity, unknownClassOptions] : severity
}

export const buildTailwindSettingsConfig = (tailwindOptions: TailwindOptions | undefined): TSESLint.FlatConfig.Config | undefined => {
  if (!tailwindOptions) return undefined

  const { noUnknownClasses, ...settingsOptions } = tailwindOptions
  const unknownClassOptions = buildUnknownClassOptions(tailwindOptions)
  const noUnknownClassesRule = createNoUnknownClassesRule(noUnknownClasses, unknownClassOptions)

  return {
    name: 'eslint-config-lite/tailwind-settings',
    ...(noUnknownClassesRule === undefined ? {} : { rules: { 'better-tailwindcss/no-unknown-classes': noUnknownClassesRule } }),
    settings: { 'better-tailwindcss': settingsOptions }
  }
}
