import { describe, expect, it } from 'vitest'

import {
  aiSdk,
  cypress,
  defineConfig,
  drizzle,
  graphql,
  jest as jestConfig,
  langchain,
  llamaIndex,
  mastra,
  mcp,
  mikroOrm,
  openAiAgents,
  prisma,
  sequelize,
  testingLibrary,
  typeorm
} from '@santi020k/eslint-config-basic'

describe('Public API Re-exports', () => {
  it('should expose defineConfig as the main config factory', async () => {
    expect(defineConfig).toBeDefined()
    expect(Array.isArray(await defineConfig({ detection: false }))).toBe(true)
  })

  it('should re-export all testing configs from the main package', () => {
    expect(typeof jestConfig).toBe("function")
    expect(typeof cypress).toBe("function")
    expect(typeof testingLibrary).toBe("function")
  })

  it('should re-export all format configs from the main package', () => {
    expect(typeof graphql).toBe("function")
  })

  it('should re-export ORM library configs from the main package', () => {
    expect(typeof typeorm).toBe("function")
    expect(typeof prisma).toBe("function")
    expect(typeof drizzle).toBe("function")
    expect(typeof mikroOrm).toBe("function")
    expect(typeof sequelize).toBe("function")
  })

  it('should re-export AI and agent library configs from the main package', () => {
    expect(typeof aiSdk).toBe("function")
    expect(typeof mastra).toBe("function")
    expect(typeof mcp).toBe("function")
    expect(typeof openAiAgents).toBe("function")
    expect(typeof langchain).toBe("function")
    expect(typeof llamaIndex).toBe("function")
  })
})
