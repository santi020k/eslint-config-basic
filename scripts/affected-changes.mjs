import { execFileSync } from 'node:child_process'

export const gitEnvironment = (environment = process.env) =>
  Object.fromEntries(Object.entries(environment).filter(([key]) => !key.startsWith('GIT_')))

const requiresFullValidation = env =>
  Boolean(env.GITHUB_EVENT_NAME && env.GITHUB_EVENT_NAME !== 'pull_request')
  || /^(release\/|changeset-release\/)/u.test(env.GITHUB_HEAD_REF ?? '')

export const readChangedFiles = ({ cwd = process.cwd(), base, head = 'HEAD', env = process.env } = {}) => {
  if (requiresFullValidation(env)) return null

  const git = args => execFileSync('git', args, {
    cwd, env: gitEnvironment(env), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']
  })

  try {
    const revision = ref => git(['rev-parse', '--verify', '--end-of-options', `${ref}^{commit}`]).trim()
    const comparison = `${revision(base || 'origin/main')}...${revision(head)}`
    const commands = [['diff', '--no-renames', '--name-only', '-z', comparison]]

    if (head === 'HEAD') commands.push(
      ['diff', '--no-renames', '--name-only', '-z', '--cached'],
      ['diff', '--no-renames', '--name-only', '-z'],
      ['ls-files', '--others', '--exclude-standard', '-z']
    )

    return [...new Set(commands.flatMap(args => git(args).split('\0').filter(Boolean)))].sort()
  } catch {
    return null
  }
}
