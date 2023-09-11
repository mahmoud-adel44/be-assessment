import User from '../User'
import Check from '../Check'

export default class CheckHooks {
  public static register() {
    try {
      Check.belongsTo(User)
    } catch (e: any) {
      console.log(e.message)
    }
  }
}
