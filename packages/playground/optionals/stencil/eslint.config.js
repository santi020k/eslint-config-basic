// @ts-check
import { eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

/** @type {import('../../basic/src/index.js').eslintConfig} */
const composer = eslintConfig

export default composer({
  config: [],
  optionals: [OptionalOption.Stencil]
})
