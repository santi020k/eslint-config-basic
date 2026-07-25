import { type FlatConfigArray, GLOB_ASTRO } from '@santi020k/eslint-config-core'

import { defineLazyConfig } from '../lazy.js'

export const astroDoctor: () => Promise<FlatConfigArray> = defineLazyConfig('astro-doctor', async () => {
  const { default: astroDoctorPlugin, RECOMMENDED_RULES } = await import('@santi020k/eslint-plugin-astro-doctor')

  return [{
    files: GLOB_ASTRO,
    name: 'eslint-config-integrations/astro-doctor',
    plugins: {
      'astro-doctor': astroDoctorPlugin
    },
    rules: RECOMMENDED_RULES
  }]
})
