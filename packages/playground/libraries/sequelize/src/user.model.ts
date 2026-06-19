import { DataTypes, Model, type Sequelize } from 'sequelize'

export class User extends Model {
  declare active: boolean
  declare email: string
  declare id: string
}

export const defineUserModel = (sequelize: Sequelize): typeof User => {
  User.init({
    active: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    }
  }, {
    modelName: 'User',
    sequelize,
    tableName: 'users'
  })

  return User
}
