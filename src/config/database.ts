import { Sequelize } from 'sequelize'
import config from '../config'
import { Dialect } from 'sequelize/types/sequelize'
import IDB from '../Interfaces/IDB'

class DB {
  constructor(
    public readonly db_database: string = config.db_database,
    public readonly db_username: string = config.db_username,
    public readonly db_password: string = config.db_password,
    public readonly db_connection: Dialect = config.db_connection,
    public readonly db_host: string = config.db_host
  ) {}

  /**
   * connect to Sequelize...
   *
   * @return Sequelize
   */
  public connect(): Sequelize {
    return new Sequelize(this.db_database, this.db_username, this.db_password, {
      dialect: this.db_connection,
      host: this.db_host,
    })
  }

  /**
   * instantiate new instance for new configuration...
   *
   * @param configurations : IDB
   *
   * @return DB
   */
  public static build(configurations: IDB = {}): DB {
    const { db_database, db_username, db_password, db_connection, db_host } =
      configurations

    return new DB(db_database, db_username, db_password, db_connection, db_host)
  }
}

export default DB
