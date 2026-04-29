import { describe, expect, it } from 'vitest'

import { Runtime } from '@santi020k/eslint-config-basic'
import { __detectionInternals } from '@santi020k/eslint-config-core'

describe('detection internals', () => {
  it('detectFrameworks deduplicates implied react entries', () => {
    const options = __detectionInternals.createDefaultOptions()
    const setRuntime = __detectionInternals.createRuntimeSetter(options)

    const frameworks = __detectionInternals.detectFrameworks({
      next: 'latest',
      react: 'latest',
      expo: 'latest'
    }, setRuntime)

    const reactCount = frameworks?.filter(name => name === 'react').length ?? 0

    expect(reactCount).toBe(1)
  })

  it('runtime setter always keeps higher-priority runtime', () => {
    const options = __detectionInternals.createDefaultOptions()
    const setRuntime = __detectionInternals.createRuntimeSetter(options)

    setRuntime(Runtime.Browser)
    setRuntime(Runtime.Node)
    setRuntime(Runtime.Universal)

    expect(options.runtime).toBe(Runtime.Node)
  })
})
