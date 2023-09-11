import { NextFunction, Request, Response } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import User from '../Models/User';

export default class SetUserFromRequest {
  static handle(request: Request, response: Response, next: NextFunction) {
    try {
      const authorizationHeader = request.headers.authorization as string;
      let decoded: JwtPayload;
      decoded = Jwt.verify(authorizationHeader, config.access_token_secret) as JwtPayload;
      if (typeof decoded.id === 'string') {
        // @ts-ignore
        request.user = User.findOne({ where: { id: parseInt(decoded.id) } });
      } else {
        throw new Error('Invalid decoded ID');
      }
      next();
    } catch (e: any) {
      next(e);
    }
  }
}