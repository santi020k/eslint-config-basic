import { describe, expect, test } from 'vitest'

import { readDocumentMetadata } from '../../../apps/docs/src/data/document-metadata.js'

describe('Documentation metadata boundary', () => {
  test('reads a valid title and description from a content entry', () => {
    expect(readDocumentMetadata({ data: { description: 'Compose your config.', title: 'Configuration' } }, 'ESLint Config')).toEqual({
      description: 'Compose your config.',
      title: 'Configuration'
    })
  })

  test('uses safe defaults when the entry or metadata is absent', () => {
    const expected = { description: 'ESLint Config documentation.', title: 'ESLint Config' }

    expect(readDocumentMetadata(null, 'ESLint Config')).toEqual(expected)
    expect(readDocumentMetadata({}, 'ESLint Config')).toEqual(expected)
    expect(readDocumentMetadata({ data: undefined }, 'ESLint Config')).toEqual(expected)
  })

  test('rejects invalid field types and supplies a description for blank content', () => {
    expect(readDocumentMetadata({ data: { description: 42, title: false } }, 'ESLint Config')).toEqual({
      description: 'ESLint Config documentation.',
      title: 'ESLint Config'
    })
    expect(readDocumentMetadata({ data: { description: '   ', title: 'Installation' } }, 'ESLint Config')).toEqual({
      description: 'Installation documentation.',
      title: 'Installation'
    })
  })
})
