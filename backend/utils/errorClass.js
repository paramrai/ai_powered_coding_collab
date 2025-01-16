// custom Errors
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

class DuplicateKeyError extends CustomError {
  constructor(message) {
    super(message, 409); // 409 Conflict
    this.name = "DuplicateKeyError";
  }
}

export {
  CustomError,
  ValidationError,
  AuthenticationError,
  DuplicateKeyError,
  NotFoundError,
  InternalServerError,
};
