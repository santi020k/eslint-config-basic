// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'
import svelte from '@santi020k/eslint-config-svelte'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  frameworks: {
    svelte
  }

})
