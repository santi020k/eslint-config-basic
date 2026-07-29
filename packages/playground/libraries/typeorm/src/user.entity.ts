import {
  Column,
  DataSource,
  Entity,
  PrimaryGeneratedColumn,
  type Repository
} from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
  @Column({ default: true })
  active!: boolean

  @Column({ length: 120 })
  email!: string

  @PrimaryGeneratedColumn('uuid')
  id!: string
}

export const createUserRepository = (
  dataSource: DataSource
): Repository<UserEntity> => dataSource.getRepository(UserEntity)
