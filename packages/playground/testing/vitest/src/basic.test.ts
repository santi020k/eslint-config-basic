import {
  describe, expect, test, vi
} from 'vitest'

const mockFn = vi.fn().mockReturnValue('mocked')
// eslint-disable-next-line @typescript-eslint/require-await
const asyncFn = async () => 'hello'

describe('Comprehensive Test Suite', () => {
  test('should verify basic arithmetic', () => {
    const result = 2 + 2

    expect(result).toBe(4)
  })

  test('should handle asynchronous functions', async () => {
    const result = await asyncFn()

    expect(result).toBe('hello')
  })

  test('should work with mocks', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = mockFn()

    expect(mockFn).toHaveBeenCalledOnce()
    expect(result).toBe('mocked')
  })

  test('should verify object equality', () => {
    const obj = { a: 1, b: 2 }

    expect(obj).toEqual({ a: 1, b: 2 })
  })
})
