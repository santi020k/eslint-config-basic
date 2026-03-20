// @ts-check
import astro from '@santi020k/eslint-config-astro'
import react from '@santi020k/eslint-config-react'
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [ConfigOption.Astro, ConfigOption.Ts],
  frameworks: {
    react,
    astro
  }
})
