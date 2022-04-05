function CustomError(error, statusCode = 500){
    return {error, statusCode};
}

function AlreadyExistsError() {
    return new CustomError('Already exists');
}

function NotExistsError() {
    return new CustomError('Not exists');
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