// @ts-check

import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'
import expo from '@santi020k/eslint-config-expo'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  config: [ConfigOption.Expo, ConfigOption.Ts],
  frameworks: {
    react,
    expo
  }
})
