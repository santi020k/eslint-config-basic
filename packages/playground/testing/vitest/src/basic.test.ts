import {
  describe,
  expect,
  it,
  vi
} from 'vitest'

const mockFn = vi.fn().mockReturnValue('mocked')

describe('Comprehensive Test Suite', () => {
  it('should verify basic arithmetic', () => {
    const result = 2 + 2

    expect(result).toBe(4)
  })

  it('should handle asynchronous functions', async () => {
    // eslint-disable-next-line @typescript-eslint/require-await
    const asyncFn = async () => 'hello'
    const result = await asyncFn()

    expect(result).toBe('hello')
  })

  it('should work with mocks', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = mockFn()

    expect(mockFn).toHaveBeenCalledOnce()
    expect(result).toBe('mocked')
  })

  it('should verify object equality', () => {
    const obj = { a: 1, b: 2 }

    expect(obj).toEqual({ a: 1, b: 2 })
  })
})
