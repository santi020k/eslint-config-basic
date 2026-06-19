// @ts-check
import { defineConfig, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  tools: [Tool.Prettier],
  tsconfigRootDir: import.meta.dirname
})
