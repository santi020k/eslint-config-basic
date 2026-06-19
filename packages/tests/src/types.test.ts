import { Extension, Format, Library, Runtime, Setting, Testing, Tool } from '@santi020k/eslint-config-basic'

import { describe, expect, test } from 'vitest'

describe('Type Exports', () => {
  test('should have all Library values', () => {
    const options = Object.values(Library)

    expect(options).toContain('typeorm')

    expect(options).toContain('prisma')

    expect(options).toContain('drizzle')

    expect(options).toContain('mikro-orm')

    expect(options).toContain('sequelize')

    expect(options).toContain('tailwind')

    expect(options).toContain('i18next')

    expect(options).toContain('mastra')

    expect(options).toContain('mcp')

    expect(options).toContain('openai-agents')

    expect(options).toContain('langchain')

    expect(options).toContain('llamaindex')

    expect(options).toContain('stencil')

    expect(options).toContain('tanstack-query')

    expect(options).toContain('tanstack-router')

    expect(options).toContain('storybook')

    expect(options).toContain('ai-sdk')

    expect(options).toContain('autogen')

    expect(options).toContain('google-genai')

    expect(options).toContain('turbo')

    expect(options).toContain('zod')
  })

  test('should have all Tool values', () => {
    const options = Object.values(Tool)

    expect(options).toContain('cspell')

    expect(options).toContain('prettier')

    expect(options).toContain('jsdoc')

    expect(options).toContain('swagger')

    expect(options).toContain('command')

    expect(options).toContain('docker')

    expect(options).toContain('github-actions')

    expect(options).toContain('nx')

    expect(options).toContain('pnpm')
  })

  test('should have all Testing values', () => {
    const options = Object.values(Testing)

    expect(options).toContain('vitest')

    expect(options).toContain('playwright')

    expect(options).toContain('jest-dom')

    expect(options).toContain('cypress')

    expect(options).toContain('jest')

    expect(options).toContain('testing-library')
  })

  test('should have all Format values', () => {
    const options = Object.values(Format)

    expect(options).toContain('mdx')

    expect(options).toContain('markdown')

    expect(options).toContain('jsonc')

    expect(options).toContain('yaml')

    expect(options).toContain('toml')

    expect(options).toContain('package-json')

    expect(options).toContain('css')

    expect(options).toContain('graphql')

    expect(options).toContain('html')
  })

  test('should have all Extension values', () => {
    const options = Object.values(Extension)

    expect(options).toContain('regexp')

    expect(options).toContain('unicorn')

    expect(options).toContain('sonarjs')

    expect(options).toContain('security')

    expect(options).toContain('perfectionist')

    expect(options).toContain('boundaries')

    expect(options).toContain('a11y')

    expect(options).toContain('best-practices')

    expect(options).toContain('biome')

    expect(options).toContain('compat')

    expect(options).toContain('de-morgan')

    expect(options).toContain('depend')

    expect(options).toContain('node')

    expect(options).toContain('oxlint')
  })

  test('should have all Setting values', () => {
    const options = Object.values(Setting)

    expect(options).toContain('gitignore')

    expect(options).toContain('no-gitignore')

    expect(options).toContain('generated-code-ignores')

    expect(options).toContain('no-generated-code-ignores')

    expect(options).toContain('default-ignores')

    expect(options).toContain('no-default-ignores')
  })

  test('should have all Runtime values', () => {
    const options = Object.values(Runtime)

    expect(options).toContain('browser')

    expect(options).toContain('bun')

    expect(options).toContain('cloudflare')

    expect(options).toContain('deno')

    expect(options).toContain('node')

    expect(options).toContain('universal')

    expect(options).toContain('worker')
  })
})
