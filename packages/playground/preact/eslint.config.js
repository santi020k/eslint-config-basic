// @ts-check
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: {
    preact: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
