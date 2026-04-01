// @ts-nocheck
// NestJS-style service — used to verify TypeScript rules fire on .ts files
export class AppService {
  private readonly items: any[] = [] // @typescript-eslint/no-explicit-any (warn)

  getData(): string {
    const unused = "double quotes" // @stylistic/quotes (warn)
    return 'hello world'
  }

  async fetchAll() {
    return this.items
  }
}
