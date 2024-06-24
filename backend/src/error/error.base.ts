export abstract class BaseError extends Error {
  abstract status: number;

  readonly path: string;

  constructor(message: string, path: string) {
    super(message);
    this.path = path;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
