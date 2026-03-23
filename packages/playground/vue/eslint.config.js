// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'
import vue from '@santi020k/eslint-config-vue'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  frameworks: {
    vue
  }

})
