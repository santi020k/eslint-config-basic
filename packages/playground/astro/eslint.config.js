// @ts-check

import astro from '@santi020k/eslint-config-astro'
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  config: [ConfigOption.Astro, ConfigOption.Ts],
  frameworks: {
    react,
    astro
  }
})
