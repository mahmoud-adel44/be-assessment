import Joi, { CustomHelpers, ExternalHelpers } from 'joi'
import FormRequest from '../Middleware/FormRequest'
import IFormRequest from '../Interfaces/IFormRequest'
import { NextFunction, Request, Response } from 'express'
import User from '../Models/User'

export default new (class LoginUserRequest extends FormRequest implements IFormRequest
{
  validateEmail = async (value: string) => {
    const emailExist = (await User.count({ where: { email: value } })) !== 0
    if (!emailExist) {
      throw new Joi.ValidationError(
        'Invalid Credentials',
        [
          {
            message: 'Invalid Credentials',
            path: ['email'],
            type: 'string.email',
            context: {
              key: 'email',
              label: 'email',
              value,
            },
          },
        ],
        value
      )
    }
  }

  rules: Joi.Schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .external(this.validateEmail)
      .required(),
    password: Joi.string().required().label('Password'),
  })
})()
