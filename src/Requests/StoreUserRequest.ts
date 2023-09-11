import Joi, { CustomHelpers, ExternalHelpers } from 'joi'
import FormRequest from '../Middleware/FormRequest'
import IFormRequest from '../Interfaces/IFormRequest'
import { NextFunction, Request, Response } from 'express'
import User from '../Models/User'

export default new (class StoreUserRequest
  extends FormRequest
  implements IFormRequest
{
  validateEmail = async (value: string) => {
    const emailExist = (await User.count({ where: { email: value } })) !== 0
    if (emailExist) {
      throw new Joi.ValidationError(
        'Email address Already exists',
        [
          {
            message: 'Email address Already exists',
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
    name: Joi.string().required(),
    password: Joi.string().min(3).max(15).required().label('Password'),
    password_confirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
    address: Joi.string(),
  })
})()
