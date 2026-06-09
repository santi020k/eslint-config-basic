// @ts-check
import { defineConfig, Extension } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: [Extension.Perfectionist],
  tsconfigRootDir: import.meta.dirname
})
