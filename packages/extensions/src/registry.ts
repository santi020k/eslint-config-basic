import type { ConfigFeature } from '@santi020k/eslint-config-core'

import { a11y } from './a11y.js'
import { astroDoctor } from './astro-doctor.js'
import { bestPractices } from './best-practices.js'
import { biome } from './biome.js'
import { boundaries } from './boundaries.js'
import { compat } from './compat.js'
import { deMorgan } from './de-morgan.js'
import { depend } from './depend.js'
import { noOnlyTests } from './no-only-tests.js'
import { node } from './node.js'
import { oxlint } from './oxlint.js'
import { perfectionist } from './perfectionist.js'
import { regexp } from './regexp.js'
import { security } from './security.js'
import { sonarjs } from './sonarjs.js'
import { unicorn } from './unicorn.js'

export const features: ConfigFeature[] = [
  { category: 'extension', create: a11y, id: 'a11y', order: 500 },
  { category: 'extension', create: astroDoctor, id: 'astro-doctor', order: 501 },
  { category: 'extension', create: biome, id: 'biome', order: 502 },
  { category: 'extension', create: () => boundaries, id: 'boundaries', order: 503 },
  { category: 'extension', create: () => bestPractices, id: 'best-practices', order: 504 },
  { category: 'extension', create: regexp, id: 'regexp', order: 505 },
  { category: 'extension', create: unicorn, id: 'unicorn', order: 506 },
  { category: 'extension', create: sonarjs, id: 'sonarjs', order: 507 },
  { category: 'extension', create: security, id: 'security', order: 508 },
  { category: 'extension', create: perfectionist, id: 'perfectionist', order: 509 },
  { category: 'extension', create: node, id: 'node', order: 510 },
  { category: 'extension', create: compat, id: 'compat', order: 511 },
  { category: 'extension', create: deMorgan, id: 'de-morgan', order: 512 },
  { category: 'extension', create: depend, id: 'depend', order: 513 },
  { category: 'extension', create: noOnlyTests, id: 'no-only-tests', order: 514 },
  { category: 'extension', create: oxlint, id: 'oxlint', order: 515 }
]
