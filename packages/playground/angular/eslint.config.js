// @ts-check
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    angular: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
