// @ts-nocheck
interface TestInterface {
  name: string
  age?: number
}

const user: TestInterface = { name: "John" } // @stylistic/quotes (warn)
console.log(user)

function test(a: any) { // @typescript-eslint/no-explicit-any (error/warn)
  return a
}
