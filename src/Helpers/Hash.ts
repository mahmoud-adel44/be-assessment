import bcrypt from 'bcrypt'

export default class Hash {
  public static make(data: string) {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(data, salt)
  }
}
