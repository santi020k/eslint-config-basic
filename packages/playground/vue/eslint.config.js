// @ts-check
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detection: { libraries: false },
  frameworks: {
    vue: true
  },
  libraries: [],
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
