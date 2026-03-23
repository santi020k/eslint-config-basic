// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'
import expo from '@santi020k/eslint-config-expo'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  frameworks: {
    react,
    expo
  }

})
