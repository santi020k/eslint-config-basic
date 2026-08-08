import { execFileSync } from 'node:child_process'

const protectedPackages = [
  '@santi020k/eslint-config-basic',
  '@santi020k/eslint-config-core',
  '@santi020k/eslint-config-lite'
]

const requiredBraceExpansionVersion = '5.0.9'

const walkDependencies = (node, seen = new Set()) => {
  if (!node || typeof node !== 'object' || seen.has(node)) return []

  seen.add(node)

  const entries = Object.entries(node.dependencies ?? {})

  return entries.flatMap(([name, dependency]) => [
    { name, version: dependency.version },
    ...walkDependencies(dependency, seen)
  ])
}

const failures = []

for (const packageName of protectedPackages) {
  const output = execFileSync(
    'pnpm',
    ['--filter', packageName, 'list', '--json', '--prod', '--depth', 'Infinity'],
    { encoding: 'utf8' }
  )

  const roots = JSON.parse(output)
  const dependencies = roots.flatMap(root => walkDependencies(root))
  const jsxA11y = dependencies.find(dependency => dependency.name === 'eslint-plugin-jsx-a11y')

  const vulnerableBrace = dependencies.find(dependency => (
    dependency.name === 'brace-expansion' &&
    dependency.version !== requiredBraceExpansionVersion
  ))

  if (jsxA11y) {
    failures.push(`${packageName} unexpectedly includes eslint-plugin-jsx-a11y@${jsxA11y.version}.`)
  }

  if (vulnerableBrace) {
    failures.push(
      `${packageName} includes brace-expansion@${vulnerableBrace.version}; ` +
      `the lean boundary requires ${requiredBraceExpansionVersion}.`
    )
  }
}

if (failures.length > 0) {
  throw new Error(`Lean-package security boundary failed:\n${failures.join('\n')}`)
}

process.stdout.write(
  `Security boundary verified for ${protectedPackages.join(', ')}: ` +
  `no jsx-a11y dependency and brace-expansion is pinned to the patched ${requiredBraceExpansionVersion} line.\n`
)
