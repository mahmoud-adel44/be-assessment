import DB from '../config/database'
import {DataTypes, Sequelize} from 'sequelize'
import User from '../Models/User'
import Check from "../Models/Check";
import CheckHooks from "../Models/Hooks/CheckHooks";

class CreateChecksTable extends DB {
    public run(): void {
        const sequelize: Sequelize = this.connect()

        Check.init(
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
                url: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                protocol: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                path: {
                    type: DataTypes.STRING,
                    defaultValue: '/',
                },
                webhook: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                port: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                timeout: {
                    type: DataTypes.INTEGER,
                    defaultValue: 5000,
                },
                interval: {
                    type: DataTypes.INTEGER,
                    defaultValue: 10,
                },
                threshold: {
                    type: DataTypes.INTEGER,
                    defaultValue: 1,
                },
                authentication: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                http_headers: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                tags: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                assert: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                ignore_ssl: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            },
            {sequelize}
        )
            .sync({force: true})
            .then(() => {
                console.log('checks table Created Successfully'.toUpperCase())
                CheckHooks.register()
                console.log('Checks Hooks Registered Successfully'.toUpperCase())
            })
            .catch((err: Error) => {
                console.log(err.message, 'checks table')
            })
    }
}

export default (new CreateChecksTable())
