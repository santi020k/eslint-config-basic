// @ts-check
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'
import solid from '@santi020k/eslint-config-solid'

export default eslintConfig({
  config: [ConfigOption.Solid, ConfigOption.Ts],
  frameworks: {
    solid
  }
})
