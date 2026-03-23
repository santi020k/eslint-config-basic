// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'
import nest from '@santi020k/eslint-config-nest'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  frameworks: {
    nest
  }

})
