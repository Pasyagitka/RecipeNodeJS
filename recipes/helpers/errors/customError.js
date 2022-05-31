class CustomError{
    constructor(error, statusCode = 500){
        this.error = error;
        this.statusCode = statusCode;
    }
}

class AlreadyExistsError extends CustomError {
    constructor(data='') {
        super(`Already exists ${data}`);
    }
}

class NotExistsError extends CustomError {
    constructor(data='') {
        super(`Not exists ${data}`);
    }
}

class UnauthorizedError extends CustomError {
    constructor() {
        super('Unauthorized', 401);
    }
}

class ForbiddenError extends CustomError {
    constructor() {
        super('Forbidden', 403);
    }
}

class BadActivationLinkError extends CustomError {
    constructor() {
        super('Bad activation link');
    }
}

class BadResetPasswordLinkError extends CustomError{
    constructor() {
        super('Bad reset password link');
    }
}

class WrongPasswordError extends CustomError{
    constructor() {
        super('Wrong password');
    }
}

module.exports = {
    AlreadyExistsError,
    NotExistsError,
    UnauthorizedError,
    BadActivationLinkError,
    WrongPasswordError,
    BadResetPasswordLinkError,
    ForbiddenError,
}