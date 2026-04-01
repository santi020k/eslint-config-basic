// Valid regular expressions testing various rules
// eslint-disable-next-line regexp/no-empty-group, regexp/no-empty-capturing-group, no-unused-vars
const testRegex = /()/
const digitRegex = /\d+/u
const wordRegex = /\w+/u
const hexRegex = /^[0-9a-f]+$/iu
const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/u
// Testing named groups
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
// Using the regexes to avoid unused variable errors
const testString = '2026-03-20'
const match = dateRegex.exec(testString)

if (match?.groups) {
  console.log(`Date: ${match.groups.year}-${match.groups.month}-${match.groups.day}`)
}

console.log(digitRegex.test('123'))

console.log(wordRegex.test('abc'))

console.log(hexRegex.test('DEADBEEF'))

console.log(emailRegex.test('test@example.com'))
