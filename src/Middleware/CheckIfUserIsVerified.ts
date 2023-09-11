import User from '../Models/User'
import { NextFunction, Request, Response } from 'express'

export default class CheckIfUserIsVerified {
  static handle(request: Request, response: Response, next: NextFunction) {
    try {
      const user = request.body?.user as User

      if (user && user.isVerified()) {
        return next()
      }

      throw new Error('Email Not Verified')
    } catch (e: any) {
      next(e)
    }
  }
}
