import { describe, expect, it } from 'vitest'

import { Extension, Format, Library, Setting, Testing, Tool } from '@santi020k/eslint-config-basic'

describe('Type Exports', () => {
  it('should have all Library values', () => {
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
  })

  it('should have all Tool values', () => {
    const options = Object.values(Tool)

    expect(options).toContain('cspell')

    expect(options).toContain('prettier')

    expect(options).toContain('jsdoc')

    expect(options).toContain('swagger')

    expect(options).toContain('command')

    expect(options).toContain('docker')

    expect(options).toContain('github-actions')

    expect(options).toContain('nx')
  })

  it('should have all Testing values', () => {
    const options = Object.values(Testing)

    expect(options).toContain('vitest')

    expect(options).toContain('playwright')

    expect(options).toContain('jest-dom')
  })

  it('should have all Format values', () => {
    const options = Object.values(Format)

    expect(options).toContain('mdx')

    expect(options).toContain('markdown')

    expect(options).toContain('jsonc')

    expect(options).toContain('yaml')

    expect(options).toContain('toml')

    expect(options).toContain('package-json')
  })

  it('should have all Extension values', () => {
    const options = Object.values(Extension)

    expect(options).toContain('regexp')

    expect(options).toContain('unicorn')

    expect(options).toContain('sonarjs')

    expect(options).toContain('security')

    expect(options).toContain('perfectionist')

    expect(options).toContain('boundaries')
  })

  it('should have all Setting values', () => {
    const options = Object.values(Setting)

    expect(options).toContain('gitignore')

    expect(options).toContain('no-gitignore')

    expect(options).toContain('generated-code-ignores')

    expect(options).toContain('no-generated-code-ignores')
  })
})
