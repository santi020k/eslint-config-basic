import type { ConfigFeature } from '@santi020k/eslint-config-core'

import { command } from './command.js'
import { cspell } from './cspell.js'
import { docker } from './docker.js'
import { githubActions } from './github-actions.js'
import { jsdoc } from './jsdoc.js'
import { nx } from './nx.js'
import { pnpm } from './pnpm.js'
import { prettier } from './prettier.js'
import { swagger } from './swagger.js'

export const features: ConfigFeature[] = [
  { category: 'tool', create: cspell, id: 'cspell', order: 100 },
  { category: 'tool', create: command, id: 'command', order: 600 },
  { category: 'tool', create: githubActions, id: 'github-actions', order: 601 },
  { category: 'tool', create: docker, id: 'docker', order: 602 },
  { category: 'tool', create: nx, id: 'nx', order: 603 },
  { category: 'tool', create: pnpm, id: 'pnpm', order: 604 },
  { category: 'tool', create: jsdoc, id: 'jsdoc', order: 605 },
  { category: 'tool', create: swagger, id: 'swagger', order: 606 },
  { category: 'tool', create: prettier, id: 'prettier', order: 1000, phase: 'finalizer' }
]
