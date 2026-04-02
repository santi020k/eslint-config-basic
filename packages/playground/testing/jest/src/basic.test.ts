describe('Jest playground', () => {
  it('should verify basic arithmetic', () => {
    const result = 2 + 2

    expect(result).toBe(4)
  })

  it('should handle async functions', async () => {
    const asyncFn = async (): Promise<string> => 'hello'
    const result = await asyncFn()

    expect(result).toBe('hello')
  })

  it('should work with mocks', () => {
    const mockFn = jest.fn().mockReturnValue('mocked')
    const result = mockFn() as string

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(result).toBe('mocked')
  })
})
