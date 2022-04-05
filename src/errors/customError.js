function CustomError(message, status = 500){
    return {message, status};
}

function AlreadyExistsError() {
    return new CustomError('Already exists');
}

function NotExistsError() {
    return new CustomError('Not exists');
}

function UnauthorizedError() {
    return new CustomError('Unauthorized', '401');
}

module.exports = {
    AlreadyExistsError,
    NotExistsError,
    UnauthorizedError,
}