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
    readonly source?: Error
  ) {
    super(500, message, source);
  }
}

export class NotFoundError extends HandleError {
  constructor(
    readonly message: string = "The data you're looking for was not found!",
    readonly source?: Error
  ) {
    super(404, message, source);
  }
}

export class BadRequestError extends HandleError {
  constructor(
    readonly message: string = "Bad User Input", 
    readonly source?: Error
    ) {
    super(400, message, source);
  }
}

export class AuthenticationError extends HandleError {
  constructor(
    readonly message: string = "Authentication Error",
    readonly source?: Error
  ) {
    super(401, message, source);
  }
}

export class UnauthorizedError extends HandleError {
  constructor(
    readonly message: string = "Unauthorized", 
    readonly source?: Error
    ) {
    super(401, message, source);
  }
}

export class FileUploadError extends HandleError {
  constructor(
    readonly message: string = "File Upload Error",
    readonly source?: Error
  ) {
    super(400, message, source);
  }
}

export class DatabaseError extends HandleError {
  constructor(
    readonly message: string = "Database Error",
    readonly source?: Error
  ) {
    super(500, message, source);
  }
}

export class RateLimitError extends HandleError {
  constructor(
    readonly message: string = "Rate Limit Error",
    readonly source?: Error
  ) {
    super(429, message, source);
  }
}