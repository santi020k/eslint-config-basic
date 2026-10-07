import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import type { DocsLinkNode } from '../../../scripts/docs-markdown-links.mjs'
import { resolveDocsMarkdownLink, rewriteDocsMarkdownLinks } from '../../../scripts/docs-markdown-links.mjs'

describe('published documentation reference links', () => {
  let root = ''
  let source = ''

  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), 'docs-markdown-links-'))

    for (const version of ['', 'v1/', 'v2/']) {
      await mkdir(join(root, `${version}api/reference/basic`), { recursive: true })
      await mkdir(join(root, `${version}api/reference/core`), { recursive: true })
      await writeFile(join(root, `${version}api/reference/core/src.md`), '# Core')
      await writeFile(join(root, `${version}api/reference/index.md`), '# API')
    }

    await writeFile(join(root, 'index.md'), '# Home')
    await mkdir(join(root, 'guide'), { recursive: true })
    await writeFile(join(root, 'guide/setup.mdx'), '# Setup')

    source = join(root, 'api/reference/basic/src.md')
  })

  afterEach(async () => {
    await rm(root, { force: true, recursive: true })
  })

  test.each(['', 'v1/', 'v2/'])('resolves cross-module references in %s docs', version => {
    const file = join(root, `${version}api/reference/basic/src.md`)

    expect(resolveDocsMarkdownLink('../core/src.md#config-options', file, root))
      .toBe(`/${version}api/reference/core/src/#config-options`)
  })

  test('preserves queries and fragments and supports a deployment base', () => {
    expect(resolveDocsMarkdownLink('../core/src.md?view=types#config-options', source, root, '/docs/'))
      .toBe('/docs/api/reference/core/src/?view=types#config-options')
  })

  test('maps index pages to their directory and supports MDX targets', () => {
    expect(resolveDocsMarkdownLink('../index.md', source, root)).toBe('/api/reference/')
    expect(resolveDocsMarkdownLink('../../../index.md', source, root, '/docs/')).toBe('/docs/')
    expect(resolveDocsMarkdownLink('../../../guide/setup.mdx#setup', source, root)).toBe('/guide/setup/#setup')
  })

  test('preserves external, anchor, absolute, missing, and non-Markdown links', () => {
    for (const href of [
      'https://example.com/source.md#type',
      '//example.com/source.md',
      '#src.md',
      '/guide/setup/',
      '../core/missing.md',
      '../core/src.json',
      '../core/%E0%A4%A.md'
    ]) {
      expect(resolveDocsMarkdownLink(href, source, root)).toBe(href)
    }
  })

  test('does not rewrite files outside the documentation root', () => {
    const docs = join(root, 'api')

    expect(resolveDocsMarkdownLink('../../../guide/setup.mdx', source, docs))
      .toBe('../../../guide/setup.mdx')
  })

  test('rewrites rendered anchors while preserving code text and other elements', () => {
    const anchor: DocsLinkNode = { type: 'element', tagName: 'a', properties: { href: '../core/src.md#type' } }
    const image: DocsLinkNode = { type: 'element', tagName: 'img', properties: { src: '../core/src.md' } }
    const code: DocsLinkNode = { type: 'element', tagName: 'code', children: [{ type: 'text', value: '[Type](../core/src.md#type)' }] }
    const tree: DocsLinkNode = { type: 'root', children: [anchor, image, code] }

    rewriteDocsMarkdownLinks(tree, source, root)

    expect(anchor.properties).toEqual({ href: '/api/reference/core/src/#type' })
    expect(image.properties).toEqual({ src: '../core/src.md' })
    expect(code.children).toEqual([{ type: 'text', value: '[Type](../core/src.md#type)' }])

    rewriteDocsMarkdownLinks(tree, source, root)

    expect(anchor.properties).toEqual({ href: '/api/reference/core/src/#type' })
  })
})
