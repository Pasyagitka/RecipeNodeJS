const { ForbiddenError } = require("../helpers/errors/customError");

module.exports = function (req, res, next) {
    try {
        if (!req.user.isGranted) {
            return next(new ForbiddenError());
        }
        next();
    } catch (e) {
        return next(new ForbiddenError());
    }
};
