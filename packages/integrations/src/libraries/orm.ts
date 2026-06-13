import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

const createOrmConfig = (
  ormName: string,
  rules: NonNullable<TSESLint.FlatConfig.Config['rules']>
): TSESLint.FlatConfig.ConfigArray => [
  {
    files: GLOB_JS_TS_ALL,
    name: `eslint-config-integrations/${ormName}`,
    rules
  }
]

/**
 * TypeORM ESLint configuration.
 *
 * TypeORM does not currently provide an ESLint 10-ready recommended flat
 * config. This integration focuses on stable imports and avoids legacy global
 * helpers that make migrations and tests harder to reason about.
 */
export const typeorm = (): TSESLint.FlatConfig.ConfigArray => createOrmConfig('typeorm', {
  'no-restricted-imports': ['error', {
    paths: [
      {
        importNames: [
          'getConnection',
          'getManager',
          'getMongoManager',
          'getMongoRepository',
          'getRepository',
          'getTreeRepository'
        ],
        message: 'Prefer DataSource, EntityManager, or injected Repository instances over legacy TypeORM global helpers.',
        name: 'typeorm'
      },
      {
        message: 'Import TypeORM APIs from "typeorm" instead of the browser build.',
        name: 'typeorm/browser'
      }
    ],
    patterns: [
      {
        group: ['typeorm/*', '!typeorm/browser'],
        message: 'Import public TypeORM APIs from "typeorm"; subpath imports can couple code to internal package layout.'
      }
    ]
  }]
})

/**
 * Prisma ESLint configuration.
 *
 * Keeps Prisma Client usage on public package entry points. This avoids runtime
 * internals that frequently change between generated client versions.
 */
export const prisma = (): TSESLint.FlatConfig.ConfigArray => createOrmConfig('prisma', {
  'no-restricted-imports': ['error', {
    patterns: [
      {
        group: [
          '@prisma/client/runtime',
          '@prisma/client/runtime/*',
          '.prisma/client',
          '.prisma/client/*'
        ],
        message: 'Import Prisma APIs from "@prisma/client"; generated runtime internals are not a stable application API.'
      }
    ]
  }]
})

/**
 * Drizzle ORM ESLint configuration.
 */
export const drizzle = (): TSESLint.FlatConfig.ConfigArray => createOrmConfig('drizzle', {
  'no-restricted-imports': ['error', {
    patterns: [
      {
        group: [
          'drizzle-orm/*/session',
          'drizzle-orm/*/session.*',
          'drizzle-orm/*/query-builders/*',
          'drizzle-orm/*/migrator',
          'drizzle-orm/*/migrator.*'
        ],
        message: 'Use Drizzle public driver, schema, migration, and query APIs instead of internal session or builder modules.'
      }
    ]
  }]
})

/**
 * MikroORM ESLint configuration.
 */
export const mikroOrm = (): TSESLint.FlatConfig.ConfigArray => createOrmConfig('mikro-orm', {
  'no-restricted-imports': ['error', {
    patterns: [
      {
        group: [
          '@mikro-orm/core/entity/*',
          '@mikro-orm/core/platforms/*',
          '@mikro-orm/core/unit-of-work/*',
          '@mikro-orm/core/utils/*'
        ],
        message: 'Import MikroORM APIs from documented package entry points instead of core internals.'
      }
    ]
  }]
})

/**
 * Sequelize ESLint configuration.
 */
export const sequelize = (): TSESLint.FlatConfig.ConfigArray => createOrmConfig('sequelize', {
  'no-restricted-imports': ['error', {
    patterns: [
      {
        group: [
          'sequelize/types/*',
          'sequelize/lib/*',
          '@sequelize/core/_non-semver-use-at-your-own-risk_/*'
        ],
        message: 'Use Sequelize public exports; internal type, lib, and non-semver modules are unstable.'
      }
    ]
  }]
})
