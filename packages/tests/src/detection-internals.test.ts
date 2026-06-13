import { Runtime } from '@santi020k/eslint-config-basic'
import { __detectionInternals } from '@santi020k/eslint-config-core'

import { describe, expect, test } from 'vitest'

describe('detection internals', () => {
  test('detectFrameworks deduplicates implied react entries', () => {
    const options = __detectionInternals.createDefaultOptions()
    const setRuntime = __detectionInternals.createRuntimeSetter(options)

    const frameworks = __detectionInternals.detectFrameworks({
      expo: 'latest',
      next: 'latest',
      react: 'latest'
    }, process.cwd(), setRuntime)

    const reactCount = frameworks?.filter(name => name === 'react').length ?? 0

    expect(reactCount).toBe(1)
  })

  test('runtime setter always keeps higher-priority runtime', () => {
    const options = __detectionInternals.createDefaultOptions()
    const setRuntime = __detectionInternals.createRuntimeSetter(options)

    setRuntime(Runtime.Browser)
    setRuntime(Runtime.Node)
    setRuntime(Runtime.Universal)

    expect(options.runtime).toBe(Runtime.Node)
  })
})
