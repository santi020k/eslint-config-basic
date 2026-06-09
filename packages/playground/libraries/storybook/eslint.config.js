// @ts-check
import { defineConfig, Library } from '../../../basic/dist/index.js'

export default await defineConfig({
  libraries: [Library.Storybook],
  tsconfigRootDir: import.meta.dirname
})
