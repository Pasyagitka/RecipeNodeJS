function CustomError(error, statusCode = 500){
    return {error, statusCode};
}

function AlreadyExistsError(data = '') {
    return new CustomError(`Already exists ${data}`);
}

function NotExistsError(data = '') {
    return new CustomError(`Not exists ${data}`);
}

function UnauthorizedError() {
    return new CustomError('Unauthorized', 401);
}

function BadActivationLinkError() {
    return new CustomError('Bad activation link');
}

function BadResetPasswordLinkError() {
    return new CustomError('Bad reset password link');
}

function WrongPasswordError() {
    return new CustomError('Wrong password');
}


module.exports = {
    AlreadyExistsError,
    NotExistsError,
    UnauthorizedError,
    BadActivationLinkError,
    WrongPasswordError,
    BadResetPasswordLinkError,
}