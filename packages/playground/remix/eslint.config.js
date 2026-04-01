// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'
import remix from '@santi020k/eslint-config-remix'

export default eslintConfig({
  typescript: true,
  tsconfigRootDir: import.meta.dirname,
  frameworks: {
    remix
  }
})
