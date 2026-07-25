import { type FlatConfigArray, GLOB_ASTRO } from '@santi020k/eslint-config-core'

export const astroDoctor = async (): Promise<FlatConfigArray> => {
  const { default: astroDoctorPlugin, RECOMMENDED_RULES } = await import('@santi020k/eslint-plugin-astro-doctor')

  return [{
    files: GLOB_ASTRO,
    name: 'eslint-config-integrations/astro-doctor',
    plugins: {
      'astro-doctor': astroDoctorPlugin
    },
    rules: RECOMMENDED_RULES
  }]
}
