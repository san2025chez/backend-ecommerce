import { Request, Response, NextFunction } from 'express'

export function functionMiddlewareExample(req: Request, res: Response, next: NextFunction) {
  console.log('****function middleware example*****')
}