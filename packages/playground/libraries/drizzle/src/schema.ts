import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  active: boolean('active').notNull().default(true),
  email: text('email').notNull().unique(),
  id: uuid('id').defaultRandom().primaryKey()
})

export const posts = pgTable('posts', {
  authorId: uuid('author_id').notNull().references(() => users.id),
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}))
