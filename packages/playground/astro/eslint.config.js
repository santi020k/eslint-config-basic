// @ts-check
import astro from '@santi020k/eslint-config-astro'
import { eslintConfig } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  tsconfigRootDir: import.meta.dirname,
  frameworks: {
    react,
    astro
  }
})
