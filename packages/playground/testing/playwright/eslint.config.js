// @ts-check
import { defineConfig, Testing } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  testing: [Testing.Playwright],
  tsconfigRootDir: import.meta.dirname
})
