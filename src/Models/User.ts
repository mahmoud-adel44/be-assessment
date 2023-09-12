import { Model } from 'sequelize'
import IUser from '../Interfaces/IUser'
import Jwt from 'jsonwebtoken'
import EmailVerificationMail from '../mails/EmailVerificationMail'

export default class User extends Model implements IUser {
  declare id: number
  declare name: string
  declare email: string
  declare password: string
  declare address?: string
  declare email_verified_at?: string

  public createToken(): string {
    return Jwt.sign(
      {
        user: {
          username: this.name,
          email: this.email,
          id: this.id,
          email_verified_at: this.email_verified_at,
        },
      },
      // @ts-ignore
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: '30d' }
    )
  }

  public sendVerificationEmail() {
    EmailVerificationMail.send(this)
  }

  public isVerified() {
    return !! this.email_verified_at
  }

  public markAsVerified() {
    return this.update({
      email_verified_at: Date.now()
    })
  }
}
