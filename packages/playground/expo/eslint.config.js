// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  frameworks: {
    expo: true
  }

})
