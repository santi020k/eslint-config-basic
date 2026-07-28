// Astro emits virtual script blocks with a *.astro/*.js path even when the
// block contains TypeScript syntax. typescript-estree picks ScriptKind.JS from
// the .js extension, which rejects type-cast expressions (e.g. `as Foo`).
// Remapping to *.ts before the parser receives the path makes it choose
// ScriptKind.TS so TypeScript syntax is accepted.
import tsParser from '@typescript-eslint/parser'

type TSParserOptions = Parameters<typeof tsParser.parseForESLint>[1]

const ASTRO_VIRTUAL_JS_RE = /\.astro[/\\][^/\\]+\.js$/

const remapPath = (options: TSParserOptions): TSParserOptions => {
  if (options?.filePath && ASTRO_VIRTUAL_JS_RE.test(options.filePath)) {
    return { ...options, filePath: options.filePath.replace(/\.js$/, '.ts') }
  }

  return options
}

export const parseForESLint: typeof tsParser.parseForESLint = (code, options) => tsParser.parseForESLint(code, remapPath(options))

export const parse: typeof tsParser.parse = (code, options) => tsParser.parse(code, remapPath(options) as Parameters<typeof tsParser.parse>[1])
