import { NextFunction, Request, Response } from 'express'
import User from '../Models/User'
import { StatusCodes } from 'http-status-codes'
import ApiResponse from '../Helpers/ApiResponse'
import bcrypt from 'bcrypt'

export default class UserController {
  public static async index(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'address'],
      })

      return response.status(StatusCodes.OK).json({
        success: true,
        data: users,
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

  public static async register(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await User.create(request.body)
      const token = user.createToken()

      return ApiResponse.new(response)
        .setStatus(StatusCodes.OK)
        .setData({ user, token })
        .toJson()
    } catch (error: any) {
      return ApiResponse.new(response)
        .setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
        .setErrors(error.data)
        .toJson()
    }
  }

  public static async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await User.findOne({ where: { email: request.body.email } })
      if (user && (await bcrypt.compare(request.body.email, user.password))) {
        const token = user.createToken()

        return ApiResponse.new(response)
          .setStatus(StatusCodes.OK)
          .setData({ user, token })
          .toJson()
      }
    } catch (error: any) {
      return ApiResponse.new(response)
        .setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
        .setErrors(error.data)
        .toJson()
    }
  }

  public static async verify(
      request: Request,
      response: Response,
      next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = await User.findOne({ where: { email: request.body.email } })
      if (user && (await bcrypt.compare(request.body.email, user.password))) {
        const token = user.createToken()

        return ApiResponse.new(response)
            .setStatus(StatusCodes.OK)
            .setData({ user, token })
            .toJson()
      }
    } catch (error: any) {
      return ApiResponse.new(response)
          .setStatus(StatusCodes.UNPROCESSABLE_ENTITY)
          .setErrors(error.data)
          .toJson()
    }
  }
}
