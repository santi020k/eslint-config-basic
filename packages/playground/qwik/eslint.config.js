// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  typescript: true,
  tsconfigRootDir: import.meta.dirname,
  frameworks: {
    qwik: true
  }
})
