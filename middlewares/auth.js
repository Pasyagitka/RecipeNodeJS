const tokenService = require('../services/tokenService');
const { UnauthorizedError } = require('../helpers/errors/customError');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(new UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(new UnauthorizedError());
        }

        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            throw new UnauthorizedError();
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(new UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(new UnauthorizedError());
    }
};
