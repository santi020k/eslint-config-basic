/* eslint func-style: off -- command runner reads best as a local declaration */
import { spawn } from 'node:child_process'
import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('../', import.meta.url)).replace(/\/$/u, '')
const tempRoot = join(repoRoot, 'packages/docs/.tmp-api-reference')
const targetRoot = join(repoRoot, 'packages/docs/src/content/docs/api/reference')

async function run(command, args, options = {}) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      env: process.env,
      shell: false,
      stdio: 'inherit',
      ...options
    })

    child.on('error', reject)

    child.on('exit', code => {
      if (code === 0) {
        resolve()

        return
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
    })
  })
}

await rm(tempRoot, { force: true, recursive: true })

await mkdir(dirname(tempRoot), { recursive: true })

await run('pnpm', ['exec', 'typedoc', '--options', 'typedoc.markdown.mjs', '--out', tempRoot])

await run(process.execPath, ['scripts/prepare-starlight-docs.mjs'], {
  env: {
    ...process.env,
    DOCS_ROOT: tempRoot
  }
})

await rm(targetRoot, { force: true, recursive: true })

await mkdir(dirname(targetRoot), { recursive: true })

await cp(tempRoot, targetRoot, { recursive: true })

await rm(tempRoot, { force: true, recursive: true })
