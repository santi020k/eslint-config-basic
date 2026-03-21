// @ts-check

import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'
import vue from '@santi020k/eslint-config-vue'

export default [
  ...eslintConfig({
    config: [ConfigOption.Vue, ConfigOption.Ts],
    frameworks: {
      vue
    },
    optionals: [
      OptionalOption.Tailwind
    ]
  }),
  {
    name: 'playground/vue/overrides',
    rules: {
      'better-tailwindcss/no-unknown-classes': 'off'
    }
  }
]
