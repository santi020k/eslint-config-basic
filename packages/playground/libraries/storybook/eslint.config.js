// @ts-check
import { defineConfig, Library } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  libraries: [Library.Storybook],
  tsconfigRootDir: import.meta.dirname
})
