// @ts-check
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detectRootDir: import.meta.dirname,
  frameworks: {
    astro: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
