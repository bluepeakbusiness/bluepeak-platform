export class HttpError extends Error {
    constructor(statusCode, message, code = "HTTP_ERROR", details = null) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}

export class AuthenticationError extends HttpError {
    constructor(message = "Authentication required.", code = "AUTHENTICATION_REQUIRED") {
        super(401, message, code);
    }
}

export class AuthorizationError extends HttpError {
    constructor(message = "Access denied.", code = "ACCESS_DENIED") {
        super(403, message, code);
    }
}

export class RequestValidationError extends HttpError {
    constructor(message = "Invalid request.", details = null) {
        super(400, message, "VALIDATION_ERROR", details);
    }
}
