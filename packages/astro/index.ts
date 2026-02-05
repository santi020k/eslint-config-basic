import astro from 'eslint-plugin-astro'

import core from '@santi020k/eslint-config-core'

export default [
  ...core,
  ...astro.configs.recommended
]
