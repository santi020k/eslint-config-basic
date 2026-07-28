import type { ConfigFeature } from '@santi020k/eslint-config-core'

import { aiSdk } from './ai.js'
import { autogen } from './autogen.js'
import { googleGenAi } from './google-genai.js'
import { i18next } from './i18next.js'
import { langchain } from './langchain.js'
import { llamaIndex } from './llamaindex.js'
import { mastra } from './mastra.js'
import { mcp } from './mcp.js'
import { openAiAgents } from './openai-agents.js'
import { drizzle, mikroOrm, prisma, sequelize, typeorm } from './orm.js'
import { stencil } from './stencil.js'
import { storybook } from './storybook.js'
import { tailwind } from './tailwind.js'
import { tanstackQuery, tanstackRouter } from './tanstack.js'
import { turbo } from './turbo.js'
import { zod } from './zod.js'

export const features: ConfigFeature[] = [
  { category: 'library', create: aiSdk, id: 'ai-sdk', order: 200 },
  { category: 'library', create: mcp, id: 'mcp', order: 201 },
  { category: 'library', create: mastra, id: 'mastra', order: 202 },
  { category: 'library', create: openAiAgents, id: 'openai-agents', order: 203 },
  { category: 'library', create: googleGenAi, id: 'google-genai', order: 204 },
  { category: 'library', create: autogen, id: 'autogen', order: 205 },
  { category: 'library', create: langchain, id: 'langchain', order: 206 },
  { category: 'library', create: llamaIndex, id: 'llamaindex', order: 207 },
  { category: 'library', create: typeorm, id: 'typeorm', order: 208 },
  { category: 'library', create: prisma, id: 'prisma', order: 209 },
  { category: 'library', create: drizzle, id: 'drizzle', order: 210 },
  { category: 'library', create: mikroOrm, id: 'mikro-orm', order: 211 },
  { category: 'library', create: sequelize, id: 'sequelize', order: 212 },
  { category: 'library', create: tailwind, id: 'tailwind', order: 213 },
  { category: 'library', create: i18next, id: 'i18next', order: 214 },
  { category: 'library', create: stencil, id: 'stencil', order: 215 },
  { category: 'library', create: tanstackQuery, id: 'tanstack-query', order: 216 },
  { category: 'library', create: tanstackRouter, id: 'tanstack-router', order: 217 },
  { category: 'library', create: storybook, id: 'storybook', order: 218 },
  { category: 'library', create: zod, id: 'zod', order: 219 },
  { category: 'library', create: turbo, id: 'turbo', order: 220 }
]
