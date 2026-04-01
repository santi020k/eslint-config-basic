// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'
import qwik from '@santi020k/eslint-config-qwik'

export default eslintConfig({
  typescript: true,
  tsconfigRootDir: import.meta.dirname,
  frameworks: {
    qwik
  }
})
