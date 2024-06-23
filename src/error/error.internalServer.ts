import { BaseError } from './error.base';

export class InternalServerError extends BaseError {
  status = 500;
}
