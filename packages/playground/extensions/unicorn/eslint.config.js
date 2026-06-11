// @ts-check
import { defineConfig, Extension } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: [Extension.Unicorn],
  tsconfigRootDir: import.meta.dirname
})
