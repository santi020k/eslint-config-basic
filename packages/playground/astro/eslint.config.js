// @ts-check
import astro from '@santi020k/eslint-config-astro'
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  tsconfigRootDir: import.meta.dirname,
  frameworks: {
    astro
  }
})
