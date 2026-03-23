// @ts-check
import { eslintConfig, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  tools: [Tool.Jsdoc]

})
