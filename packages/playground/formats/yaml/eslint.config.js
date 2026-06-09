// @ts-check
import { defineConfig, Format } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  formats: [Format.Yaml],
  tsconfigRootDir: import.meta.dirname
})
