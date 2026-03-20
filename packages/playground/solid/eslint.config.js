// @ts-check
import solid from '@santi020k/eslint-config-solid'
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [ConfigOption.Solid, ConfigOption.Ts],
  frameworks: {
    solid
  }
})
