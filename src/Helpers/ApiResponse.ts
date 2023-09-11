import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'

export default class ApiResponse {
  data: any = []
  errors: any = []
  status: any = StatusCodes.OK
  message: string = 'This Action Done Successfully'
  isSuccess: boolean = true

  private constructor(public readonly response: Response) {}

  static new(response: Response) {
    return new ApiResponse(response)
  }

  setData(data: any) {
    this.data = data
    return this
  }

  setErrors(errors: any) {
    this.isSuccess = false
    this.errors = errors
    return this
  }

  setStatus(status: number) {
    this.status = status
    return this
  }

  toJson(): Response {
    const body = this.isSuccess ? { data: this.data } : { errors: this.errors }

    return this.response.status(this.status).json({
      success: this.isSuccess,
      message: this.message,
      ...body,
    })
  }
}
