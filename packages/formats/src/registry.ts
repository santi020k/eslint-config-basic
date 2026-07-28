import type { ConfigFeature } from '@santi020k/eslint-config-core'

import { css } from './css.js'
import { graphql } from './graphql.js'
import { html } from './html.js'
import { jsonc } from './jsonc.js'
import { markdown } from './markdown.js'
import { mdx } from './mdx.js'
import { packageJson } from './package-json.js'
import { toml } from './toml.js'
import { yaml } from './yaml.js'

export const features: ConfigFeature[] = [
  { category: 'format', create: css, id: 'css', order: 400 },
  { category: 'format', create: html, id: 'html', order: 401 },
  { category: 'format', create: mdx, id: 'mdx', order: 402 },
  { category: 'format', create: markdown, id: 'markdown', order: 403 },
  { category: 'format', create: packageJson, id: 'package-json', order: 404 },
  { category: 'format', create: jsonc, id: 'jsonc', order: 405 },
  { category: 'format', create: yaml, id: 'yaml', order: 406 },
  { category: 'format', create: toml, id: 'toml', order: 407 },
  { category: 'format', create: graphql, id: 'graphql', order: 408 }
]
