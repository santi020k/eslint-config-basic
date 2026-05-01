// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  detectRootDir: import.meta.dirname,
  typescript: true,
  tsconfigRootDir: import.meta.dirname,
  frameworks: {
    astro: true
  }
})
