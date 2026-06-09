// @ts-check
import { defineConfig, Extension } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  tsconfigRootDir: import.meta.dirname,
  extensions: [Extension.Unicorn]
})
