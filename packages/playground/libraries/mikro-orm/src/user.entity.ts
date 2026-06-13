import { defineEntity, p } from '@mikro-orm/core'

const UserSchema = defineEntity({
  name: 'User',
  properties: {
    active: p.boolean().default(true),
    email: p.string().unique(),
    id: p.integer().primary(),
  },
  tableName: 'users',
})

export class User extends UserSchema.class {}

UserSchema.setClass(User)
