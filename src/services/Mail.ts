import config from '../config'
import nodemailer, { Transporter } from 'nodemailer'
import IUser from '../Interfaces/IUser'

class Mail {
  title: string = ''
  body: string = ''
  user: IUser | null = null
  protected transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.email_host,
      auth: {
        user: config.email_user,
        pass: config.email_password,
      },
    })
  }

  setBody(body: string, options = {}) {
    this.body = body
    return this
  }

  setTitle(title: string) {
    this.title = title
    return this
  }

  to(user: IUser | null) {
    if (!user) throw new Error('User Cannot be null')
    this.user = user
    return this
  }

  submit() {
    if (!this.user) throw new Error('User Cannot be null')

    this.transporter.sendMail(
      {
        from: 'uptime@gmail.com',
        to: this.user?.email,
        subject: this.title,
        text: this.body,
      },
      (err, info) => {
        if (err) throw Error(err.message)
        console.log('Email Sent Successfully')
        console.log(info)
      }
    )
  }
}

export default new Mail()
