/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response, Request } from 'express';

export const asyncError =
  (fun: (req: Request, res: Response, next: NextFunction) => Promise<any> | any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fun(req, res, next);
    } catch (error) {
      next(error);
    }
  };
