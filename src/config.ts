import dotenv from 'dotenv'
import { Dialect } from 'sequelize/types/sequelize'

dotenv.config()

const {
  APP_PORT,
  APP_NAME,
  APP_URL,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CONNECTION,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASSWORD,
  ACCESS_TOKEN_SECRET,
} = process.env

export default {
  port: APP_PORT,
  name: APP_NAME,
  uri: APP_URL,
  db_host: DB_HOST as string,
  db_port: DB_PORT,
  db_database: DB_DATABASE as string,
  db_username: DB_USERNAME as string,
  db_password: DB_PASSWORD as string,
  db_connection: DB_CONNECTION as Dialect,
  email_host: EMAIL_HOST as string,
  email_user: EMAIL_USER as string,
  email_password: EMAIL_PASSWORD as string,
  access_token_secret: ACCESS_TOKEN_SECRET as string
}
