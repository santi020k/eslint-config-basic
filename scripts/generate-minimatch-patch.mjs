import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const vendor = join(root, 'vendor/minimatch')
const source = join(vendor, 'upstream-10.2.6.tgz')
const expected = 'vpLQEs+VLCr1nU0BXS07maYoFwlDAH0gngQuuttxIwutDFEMHq2blX+8vpgxDdK3J1PwjCJiep77OitTZ4Ll1A=='

if (createHash('sha512').update(readFileSync(source)).digest('base64') !== expected) {
  throw new Error('The original minimatch tarball does not match npm provenance.')
}

const temporary = mkdtempSync(join(tmpdir(), 'minimatch-patch-'))

try {
  execFileSync('tar', ['-xzf', source, '-C', temporary])

  const packageDir = join(temporary, 'package')

  execFileSync('git', ['apply', '--unidiff-zero', join(vendor, 'optimization-limit.patch')], { cwd: packageDir })

  const manifestPath = join(packageDir, 'package.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

  manifest.name = '@santi020k/minimatch-optimization-guard'

  manifest.version = '10.2.6-santi.1'

  manifest.private = true

  manifest.description = 'Maintained optimization-limited derivative of minimatch 10.2.6; see SOURCE.md.'

  manifest.files.push('SOURCE.md')

  delete manifest.devDependencies

  delete manifest.scripts

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)

  writeFileSync(join(packageDir, 'SOURCE.md'), readFileSync(join(vendor, 'README.md')))

  execFileSync('npm', ['pack', '--ignore-scripts', '--pack-destination', vendor], {
    cwd: packageDir,
    stdio: 'inherit'
  })
} finally {
  rmSync(temporary, { recursive: true, force: true })
}
