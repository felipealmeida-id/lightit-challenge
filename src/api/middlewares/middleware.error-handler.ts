/* eslint-disable @typescript-eslint/no-unused-vars */
import { MulterError } from 'multer';
import { ZodError } from 'zod';
import { ErrorRequestHandler } from 'express';
import { BaseError } from '../../error';
import { getLogger } from '../../utils';

const logger = getLogger('Error');

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    const error = err.issues.map((issue) => ({
      path: issue.path,
      error: issue.message,
    }));
    return res.status(400).send(error);
  }
  if (err instanceof MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
    const error = `${err.field} unexpected value`;
    return res.status(400).send({ error });
  }
  if (err instanceof BaseError && err.status !== 500) {
    return res.status(err.status).send({ error: err.message });
  }
  logger.error(err.message);
  return res.status(500).send({ error: 'Internal Server Error' });
};
