// @ts-check
import { defineConfig, Format } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  formats: [Format.Markdown],
  tsconfigRootDir: import.meta.dirname
})
