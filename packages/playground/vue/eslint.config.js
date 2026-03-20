// @ts-check
import vue from '@santi020k/eslint-config-vue'
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [ConfigOption.Vue, ConfigOption.Ts],
  frameworks: {
    vue
  },
  optionals: [
    OptionalOption.Tailwind
  ]
})
