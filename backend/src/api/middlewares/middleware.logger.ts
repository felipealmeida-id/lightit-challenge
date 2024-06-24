import { Handler } from 'express';
import { getLogger } from '../../utils';

const requestLogger = getLogger('MWLog');
export const loggingMiddleware: Handler = (req, _, next) => {
  requestLogger.info(req.method, req.url);
  next();
};
