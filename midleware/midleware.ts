import { Request, Response, NextFunction } from 'express';

export function loggers(req: Request, res: Response, next: NextFunction) {

  next();
};

