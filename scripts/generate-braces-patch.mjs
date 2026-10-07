import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const vendor = join(root, 'vendor/braces')
const source = join(vendor, 'upstream-3.0.3.tgz')
const expected = 'yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA=='

if (createHash('sha512').update(readFileSync(source)).digest('base64') !== expected) {
  throw new Error('The original braces tarball does not match npm provenance.')
}

const temporary = mkdtempSync(join(tmpdir(), 'braces-patch-'))

try {
  execFileSync('tar', ['-xzf', source, '-C', temporary])

  const packageDir = join(temporary, 'package')

  execFileSync('git', ['apply', join(vendor, 'depth-limit.patch')], { cwd: packageDir })

  const manifestPath = join(packageDir, 'package.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

  manifest.name = '@santi020k/braces-depth-guard'

  manifest.version = '3.0.3-santi.1'

  manifest.private = true

  manifest.description = 'Maintained depth-limited derivative of braces 3.0.3; see SOURCE.md.'

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
