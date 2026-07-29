/* eslint-disable no-console -- This interactive CLI communicates through the terminal. */

import { spawnSync } from 'node:child_process'
import process from 'node:process'
import { createInterface } from 'node:readline/promises'
import { pathToFileURL } from 'node:url'

const TYPES = [
  ['feat', 'A new feature'],
  ['fix', 'A bug fix'],
  ['docs', 'Documentation only'],
  ['style', 'Formatting without behavior changes'],
  ['refactor', 'A code change that is neither a fix nor a feature'],
  ['perf', 'A performance improvement'],
  ['test', 'Tests'],
  ['build', 'Build system or dependency changes'],
  ['ci', 'CI configuration'],
  ['chore', 'Other maintenance'],
  ['revert', 'Revert a previous change']
]

const askRequired = async (prompt, question) => {
  while (true) {
    const answer = (await prompt.question(question)).trim()

    if (answer) return answer

    console.error('A value is required.')
  }
}

const askYesNo = async (prompt, question) => {
  while (true) {
    const answer = (await prompt.question(`${question} [y/N] `)).trim().toLowerCase()

    if (!answer || answer === 'n' || answer === 'no') return false

    if (answer === 'y' || answer === 'yes') return true

    console.error('Please answer yes or no.')
  }
}

const selectType = async prompt => {
  console.log('Select the type of change:')

  for (const [index, [type, description]] of TYPES.entries()) {
    console.log(`  ${index + 1}. ${type.padEnd(8)} ${description}`)
  }

  while (true) {
    const answer = (await prompt.question('Type: ')).trim().toLowerCase()
    const numericSelection = Number(answer)

    const selected = Number.isInteger(numericSelection) ?
      TYPES.find((_, index) => index === numericSelection - 1) :
      TYPES.find(([type]) => type === answer)

    if (selected) return selected[0]

    console.error(`Choose 1-${TYPES.length} or enter a listed type.`)
  }
}

export const formatCommitMessage = ({
  body,
  breaking,
  issues,
  scope,
  subject,
  type
}) => {
  const header = `${type}${scope ? `(${scope})` : ''}${breaking ? '!' : ''}: ${subject}`

  const paragraphs = [
    body,
    breaking ? `BREAKING CHANGE: ${breaking}` : '',
    issues
  ].filter(Boolean)

  return [header, ...paragraphs].join('\n\n')
}

const hasStagedChanges = () => {
  const result = spawnSync('git', ['diff', '--cached', '--quiet'])

  return result.status === 1
}

const validate = message => spawnSync(
  'pnpm',
  ['exec', 'commitlint', '--color'],
  {
    encoding: 'utf8',
    input: message
  }
)

const commit = message => spawnSync(
  'git',
  ['commit', '--file=-'],
  {
    input: message,
    stdio: ['pipe', 'inherit', 'inherit']
  }
)

export const main = async () => {
  if (!hasStagedChanges()) {
    console.error('No staged changes. Stage the files you want to commit first.')

    process.exitCode = 1

    return
  }

  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  try {
    const type = await selectType(prompt)
    const scope = (await prompt.question('Scope (optional): ')).trim()
    const subject = await askRequired(prompt, 'Short imperative description: ')
    const body = (await prompt.question('Longer description (optional): ')).trim()
    const isBreaking = await askYesNo(prompt, 'Does this include a breaking change?')

    const breaking = isBreaking ?
      await askRequired(prompt, 'Describe the breaking change: ') :
      ''

    const issues = (await prompt.question('Issue references (optional, e.g. "Closes #123"): ')).trim()
    const message = formatCommitMessage({ body, breaking, issues, scope, subject, type })

    console.log(`\n${message}\n`)

    const validation = validate(message)

    if (validation.status !== 0) {
      process.stderr.write(validation.stdout)

      process.stderr.write(validation.stderr)

      process.exitCode = validation.status ?? 1

      return
    }

    if (!await askYesNo(prompt, 'Create this commit?')) {
      console.log('Commit cancelled.')

      return
    }

    const result = commit(message)

    if (result.status !== 0) process.exitCode = result.status ?? 1
  }
  finally {
    prompt.close()
  }
}

const isDirectInvocation = process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href

if (isDirectInvocation) await main()
