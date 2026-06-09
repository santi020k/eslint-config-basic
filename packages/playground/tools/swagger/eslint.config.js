// @ts-check
import { eslintConfig, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tools: [Tool.Swagger],
  tsconfigRootDir: import.meta.dirname
})
