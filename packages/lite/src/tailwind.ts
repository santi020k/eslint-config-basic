import type { TailwindOptions } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

export const buildTailwindSettingsConfig = (tailwindOptions: TailwindOptions | undefined): TSESLint.FlatConfig.Config | undefined => {
  if (!tailwindOptions) return undefined

  const { noUnknownClasses, ...settingsOptions } = tailwindOptions
  const unknownClassOptions: Record<string, unknown> = {}

  if (tailwindOptions.entryPoint) unknownClassOptions.entryPoint = tailwindOptions.entryPoint

  if (tailwindOptions.ignore?.length) unknownClassOptions.ignore = tailwindOptions.ignore

  const hasUnknownClassOptions = Object.keys(unknownClassOptions).length > 0
  let noUnknownClassesRule: TSESLint.FlatConfig.RuleEntry | undefined

  if (hasUnknownClassOptions || noUnknownClasses !== undefined) {
    const severity = noUnknownClasses ?? 'error'

    if (severity === false) {
      noUnknownClassesRule = 'off'
    } else if (hasUnknownClassOptions) {
      noUnknownClassesRule = [severity, unknownClassOptions]
    } else {
      noUnknownClassesRule = severity
    }
  }

  return {
    name: 'eslint-config-lite/tailwind-settings',
    ...(noUnknownClassesRule === undefined ? {} : { rules: { 'better-tailwindcss/no-unknown-classes': noUnknownClassesRule } }),
    settings: { 'better-tailwindcss': settingsOptions }
  }
}
