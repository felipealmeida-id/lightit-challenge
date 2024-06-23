import { BaseError } from './error.base';

export class NotFoundError extends BaseError {
  status = 404;
}
