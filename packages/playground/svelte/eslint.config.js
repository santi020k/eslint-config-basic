// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: {
    svelte: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
