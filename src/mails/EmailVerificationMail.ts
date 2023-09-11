import Mail from '../services/Mail'
import IUser from '../Interfaces/IUser'
import config from '../config'
import IMail from '../Interfaces/IMail'
import {options} from "joi";
import User from "../Models/User";

class EmailVerificationMail implements IMail {
    send(notifiable: User): any {
        const body = '`Hi! There, You have recently visited \n' +
            '           our website and entered your email.\n' +
            '           Please follow the given link to verify your email\n' +
            `           ${config.uri}/verify/${notifiable.createToken()}` +
            '           Thanks'

        Mail.setBody(body)
            .setTitle("Email Verification")
            .to(notifiable)
            .submit()
    }
}

export default (new EmailVerificationMail)
