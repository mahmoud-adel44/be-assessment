import Joi, { CustomHelpers, ExternalHelpers } from 'joi'
import FormRequest from '../Middleware/FormRequest'
import IFormRequest from '../Interfaces/IFormRequest'
import { NextFunction, Request, Response } from 'express'
import User from '../Models/User'

export default new (class StoreCheckRequest extends FormRequest implements IFormRequest
{
  rules: Joi.Schema = Joi.object({
    name: Joi.string().required().label('Name'),
    url: Joi.string().uri().required().label('Url'),
    protocol: Joi.number().required().label('Protocol'),
    path: Joi.string().label('path'),
    webhook: Joi.boolean().label('Webhook'),
    port: Joi.number().required().label('Port'),
    timeout: Joi.number().label('Timeout'),
    interval: Joi.number().required().label('Interval'),
    threshold: Joi.number().label('Threshold'),
    authentication: Joi.object().label('Authentication'),
    http_headers: Joi.object().label('Http-Headers'),
    tags: Joi.object().label('Tags'),
    assert: Joi.object().label('Assert'),
    ignore_ssl: Joi.boolean().label('Assert'),
  })
})()
