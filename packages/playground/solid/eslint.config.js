// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'
import solid from '@santi020k/eslint-config-solid'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  frameworks: {
    solid
  }

})
