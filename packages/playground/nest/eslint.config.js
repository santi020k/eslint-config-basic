// @ts-check
import nest from '@santi020k/eslint-config-nest'
import { ConfigOption, eslintConfig, RuntimeOption } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [ConfigOption.Ts],
  runtime: RuntimeOption.Node,
  frameworks: {
    nest
  }
})
