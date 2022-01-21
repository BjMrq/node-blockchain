"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizeError = exports.ValidationError = exports.ExpiredTokenError = exports.NotAuthenticatedError = exports.LoginError = exports.NotFoundError = exports.UnprocessableEntityError = exports.ThirdPartyError = exports.EmailNotSentError = exports.ImplementationMissingError = exports.QueryError = exports.ConfigError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(errorMessage) {
        super(errorMessage);
    }
}
exports.CustomError = CustomError;
class ConfigError extends CustomError {
    message;
    name = 'ConfigError';
    status = 555;
    expose = false;
    constructor(message) {
        super(`The configuration failed: ${message}`);
    }
}
exports.ConfigError = ConfigError;
class QueryError extends CustomError {
    message;
    name = 'QueryError';
    status = 510;
    expose = false;
    constructor(message) {
        super(`The query failed: ${message}`);
    }
}
exports.QueryError = QueryError;
class ImplementationMissingError extends CustomError {
    message;
    name = 'ImplementationMissingError';
    status = 550;
    expose = false;
    constructor(message) {
        super(`You are missing an implementation: ${message}`);
    }
}
exports.ImplementationMissingError = ImplementationMissingError;
class EmailNotSentError extends CustomError {
    message;
    name = 'EmailNotSentError';
    status = 503;
    expose = false;
    constructor(message) {
        super(`Email could not been sent: ${message}`);
    }
}
exports.EmailNotSentError = EmailNotSentError;
class ThirdPartyError extends CustomError {
    message;
    name = 'ThirdPartyError';
    status = 515;
    expose = false;
    constructor(message) {
        super(`A third party involved in the request could not been reach: ${message}`);
    }
}
exports.ThirdPartyError = ThirdPartyError;
class UnprocessableEntityError extends Error {
    name = 'UnprocessableEntityError';
    status = 422;
    expose = true;
    constructor(message) {
        super(`The request could not be processed: ${message}`);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
class NotFoundError extends CustomError {
    message;
    name = 'NotFoundError';
    status = 400;
    expose = true;
    constructor(message) {
        super(`Not found: ${message}`);
    }
}
exports.NotFoundError = NotFoundError;
class LoginError extends CustomError {
    message;
    name = 'LoginError';
    status = 401;
    expose = true;
    constructor() {
        super('Unable to login');
    }
}
exports.LoginError = LoginError;
class NotAuthenticatedError extends CustomError {
    message;
    name = 'NotAuthenticatedError';
    status = 401;
    expose = true;
    constructor() {
        super('You need to be authenticated to perform this action');
    }
}
exports.NotAuthenticatedError = NotAuthenticatedError;
class ExpiredTokenError extends CustomError {
    message;
    name = 'ExpiredTokenError';
    status = 401;
    expose = true;
    constructor() {
        super('The token sent with the request is expired');
    }
}
exports.ExpiredTokenError = ExpiredTokenError;
class ValidationError extends CustomError {
    message;
    name = 'ValidationError';
    status = 422;
    expose = true;
    constructor(message) {
        super(`The validation failed: ${message}`);
    }
}
exports.ValidationError = ValidationError;
class NotAuthorizeError extends CustomError {
    message;
    name = 'NotAuthorizeError';
    status = 403;
    expose = true;
    constructor() {
        super('You are not authorize to perform this action');
    }
}
exports.NotAuthorizeError = NotAuthorizeError;
//# sourceMappingURL=errors.js.map