// @ts-check
import { ConfigOption, eslintConfig, OptionalOption } from './dist/index.js'

export default [
  ...eslintConfig({ config: [ConfigOption.Ts], optionals: [OptionalOption.Mdx, OptionalOption.Markdown] }),
  {
    name: 'local-config',
    ignores: [
      'dist/*',
      'packages/*/dist/*',
      'packages/*/*.config.ts',
      'packages/*/index.ts',
      '.agent/**',
      'CHANGELOG.md',
      'AGENTS.md',
      'llms.txt',
      '.github/*.md'
    ]
  }
]
