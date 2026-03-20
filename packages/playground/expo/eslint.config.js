// @ts-check
import expo from '@santi020k/eslint-config-expo'
import react from '@santi020k/eslint-config-react'
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [ConfigOption.Expo, ConfigOption.Ts],
  frameworks: {
    react,
    expo
  }
})
