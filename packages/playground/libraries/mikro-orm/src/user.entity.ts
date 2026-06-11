import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'users' })
export class User {
  @Property()
  active = true

  @Property({ unique: true })
  email!: string

  @PrimaryKey()
  id!: number
}
