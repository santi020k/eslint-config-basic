import { parentPort } from 'node:worker_threads'

import { renderOgImage } from './render-og-image.js'

parentPort?.on('message', async ({ id, props }) => {
  try {
    const buffer = await renderOgImage(props)
    const copy = new Uint8Array(buffer.length)

    copy.set(buffer)

    parentPort.postMessage({ buffer: copy.buffer, id, ok: true }, [copy.buffer])
  } catch (err) {
    parentPort.postMessage({
      id,
      message: err instanceof Error ? err.message : String(err),
      ok: false,
      stack: err instanceof Error ? err.stack : undefined
    })
  }
})
