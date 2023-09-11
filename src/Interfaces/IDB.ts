import { Dialect } from 'sequelize/types/sequelize'

type IDB = {
  db_database?: string
  db_username?: string
  db_password?: string
  db_connection?: Dialect
  db_host?: string
}
export default IDB
