import type { ConfigFeature } from '@santi020k/eslint-config-core'

import { cypress } from './cypress.js'
import { jest } from './jest.js'
import { jestDom } from './jest-dom.js'
import { playwright } from './playwright.js'
import { testingLibrary } from './testing-library.js'
import { vitest } from './vitest.js'

export const features: ConfigFeature[] = [
  { category: 'testing', create: vitest, id: 'vitest', order: 300 },
  { category: 'testing', create: playwright, id: 'playwright', order: 301 },
  { category: 'testing', create: jest, id: 'jest', order: 302 },
  { category: 'testing', create: jestDom, id: 'jest-dom', order: 303 },
  { category: 'testing', create: cypress, id: 'cypress', order: 304 },
  { category: 'testing', create: testingLibrary, id: 'testing-library', order: 305 }
]
