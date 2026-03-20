// @ts-check
import next from '@santi020k/eslint-config-next'
import react from '@santi020k/eslint-config-react'
import { ConfigOption, eslintConfig, NextMode } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [ConfigOption.Next, ConfigOption.Ts],
  nextMode: NextMode.AppRouter,
  frameworks: {
    next,
    react
  }
})
