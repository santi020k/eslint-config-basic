// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'
import remix from '@santi020k/eslint-config-remix'

export default eslintConfig({
  typescript: true,
  tsconfigRootDir: import.meta.dirname,
  frameworks: {
    react,
    remix
  }
})
