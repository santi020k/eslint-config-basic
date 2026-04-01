/**
 * @param {string} foo description
 * @description description
 * @returns {string} description
 */
const bar = foo => foo

// eslint-disable-next-line @stylistic/padding-line-between-statements, no-unused-vars
const missingDoc = () => 'test'

console.log('🚀 ~ bar:', bar('foo'))
