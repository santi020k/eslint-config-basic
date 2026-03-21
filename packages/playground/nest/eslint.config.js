// @ts-check

import { ConfigOption, eslintConfig, RuntimeOption } from '@santi020k/eslint-config-basic'
import nest from '@santi020k/eslint-config-nest'

export default eslintConfig({
  config: [ConfigOption.Nest, ConfigOption.Ts],
  runtime: RuntimeOption.Node,
  frameworks: {
    nest
  }
})
