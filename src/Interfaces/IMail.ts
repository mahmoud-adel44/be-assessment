import IUser from './IUser'

export default interface IMail {
  send(notifiable: IUser | any): any
}
