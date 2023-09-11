import Joi from 'joi'
import IResponse from '../Interfaces/IResponse'
import { NextFunction, Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiResponse from '../Helpers/ApiResponse'

export default class FormRequest {
  declare rules: Joi.Schema

  /**
   *
   * @param validationResult
   * @param response
   * @param next
   */
  public handleResponse(
    validationResult: any,
    response: Response,
    next: NextFunction
  ): any {
    if (!validationResult.success) {
      return ApiResponse.new(response)
        .setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
        .setErrors(validationResult)
        .toJson()
    }

    next()
  }

  public async handle(schema: Joi.Schema, request: Request<any>): Promise<any> {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    }

    const responseData: IResponse = {
      success: true,
      errors: [],
      data: [],
    }

    try {
      const result = await schema.validateAsync(request.body, validationOptions)
      request.body = { ...request.body }

      return responseData
    } catch (e: any) {
      const errors: string[] = []
      await e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message.replace('"', '').replace('"', ''))
      })

      responseData.success = false
      responseData.errors = errors
      responseData.data = []

      return responseData
    }
  }

  public async validate(
    req: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const validationResult = await this.handle(this.rules, req)

    await this.handleResponse(validationResult, response, next)
  }
}
