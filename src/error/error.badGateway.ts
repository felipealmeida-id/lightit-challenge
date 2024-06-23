import { BaseError } from './error.base';

export class BadGatewayError extends BaseError {
  status = 502;
}
