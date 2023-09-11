import User from '../User'
import Hash from '../../Helpers/Hash'
import Check from "../Check";

export default class UserHooks {
  public static register() {
    // hook for hashing password
    User.beforeSave((user: User) => {
      user.password = Hash.make(user.password)
    })

    User.afterCreate((user: User) => {
      user.sendVerificationEmail()
    })

    User.hasMany(Check)
  }
}
