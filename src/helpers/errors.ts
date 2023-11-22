export default class HandleError extends Error {
  constructor(
    readonly status: number,
    readonly message: string,
    readonly source?: Error
  ) {
    super();
  }
}

export class InternalServerError extends HandleError {
  constructor(
    readonly message: string = "Internal Server Error",
    source?: Error
  ) {
    super(500, message, source);
  }
}

export class NotFoundError extends HandleError {
  constructor(
    readonly message: string = "The data you're looking for was not found!",
    source?: Error
  ) {
    super(404, message, source);
  }
}

export class BadRequestError extends HandleError {
  constructor(
    readonly message: string = "Bad User Input", 
    source?: Error) {
    super(400, message, source);
  }
}

export class UnauthorizedError extends HandleError {
  constructor(
    readonly message: string = "Unauthorized", 
    source?: Error) {
    super(401, message, source);
  }
}
