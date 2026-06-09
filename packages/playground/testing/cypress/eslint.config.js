// @ts-check
import { defineConfig, Testing } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  testing: [Testing.Cypress],
  tsconfigRootDir: import.meta.dirname
})
