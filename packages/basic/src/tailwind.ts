import type { TailwindOptions } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

export const buildTailwindSettingsConfig = (
  tailwindOptions: TailwindOptions
): TSESLint.FlatConfig.Config => {
  const { noUnknownClasses, ...settingsOptions } = tailwindOptions

  const unknownClassOptions = {
    ...(tailwindOptions.entryPoint ? { entryPoint: tailwindOptions.entryPoint } : {}),
    ...(tailwindOptions.ignore?.length ? { ignore: tailwindOptions.ignore } : {})
  }

  const hasUnknownClassOptions = Object.keys(unknownClassOptions).length > 0
  const severity = noUnknownClasses ?? 'error'
  let noUnknownClassesRule: TSESLint.FlatConfig.RuleEntry | undefined

  if (hasUnknownClassOptions || noUnknownClasses !== undefined) {
    if (severity === false) {
      noUnknownClassesRule = 'off'
    } else {
      noUnknownClassesRule = hasUnknownClassOptions ? [severity, unknownClassOptions] : severity
    }
  }

  return {
    name: 'eslint-config-basic/tailwind-settings',
    ...(noUnknownClassesRule === undefined ?
      {} :
      { rules: { 'better-tailwindcss/no-unknown-classes': noUnknownClassesRule } }),
    settings: { 'better-tailwindcss': settingsOptions }
  }
}
