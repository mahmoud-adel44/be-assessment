import { NextFunction, Request, Response } from 'express'
import User from '../Models/User'
import { StatusCodes } from 'http-status-codes'
import ApiResponse from '../Helpers/ApiResponse'
import bcrypt from 'bcrypt'
import Check from '../Models/Check'

export default class CheckController {
  public static async index(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      // @ts-ignore
      const checks = await Check.findAll({
        where: { user_id: request.user.id },
      })

      return response.status(StatusCodes.OK).json({
        success: true,
        data: checks,
        message: 'This Action has been successfully',
      })
    } catch (error: any) {
      response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: error.message,
        data: error.data,
      })
    }
  }

  public static async store(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const check = await Check.create(request.body)

      return ApiResponse.new(response)
        .setStatus(StatusCodes.OK)
        .setData(check)
        .toJson()
    } catch (error: any) {
      return ApiResponse.new(response)
        .setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
        .setErrors(error.data)
        .toJson()
    }
  }
}
