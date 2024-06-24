import { BaseError } from './error.base';

export class BadRequestError extends BaseError {
  status = 400;
}
