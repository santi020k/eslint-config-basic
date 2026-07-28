import { type FlatConfigArray } from '@santi020k/eslint-config-core'

import { defineLazyConfig } from '../lazy.js'

export const astroDoctor: () => Promise<FlatConfigArray> = defineLazyConfig('astro-doctor', async () => {
  const { default: astroDoctorPlugin } = await import('@santi020k/eslint-plugin-astro-doctor')
  const recommendedConfig = astroDoctorPlugin.configs.recommended

  return [{
    files: recommendedConfig.files,
    name: 'eslint-config-integrations/astro-doctor',
    plugins: {
      'astro-doctor': astroDoctorPlugin
    },
    rules: recommendedConfig.rules
  }]
})
