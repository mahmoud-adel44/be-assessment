import DB from '../config/database'
import { DataTypes, Sequelize } from 'sequelize'
import User from '../Models/User'
import UserHooks from '../Models/Hooks/UserHooks'

class CreateUsersTable extends DB {
  public run(): void {
    const sequelize: Sequelize = this.connect()

    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email_verified_at: {
            type: DataTypes.DATE,
            allowNull: true,
        }
      },
      { sequelize }
    )
      .sync({ force: true })
      .then(() => {
        console.log('users table Created Successfully'.toUpperCase())
      })
      .catch((err: Error) => {
        console.log(err.message, 'users table')
      })

    // Register User hooks...
      UserHooks.register()
  }
}

export default (new CreateUsersTable())
