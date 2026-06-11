// @ts-check
import { defineConfig, Extension } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: [Extension.Sonarjs],
  tsconfigRootDir: import.meta.dirname
})
