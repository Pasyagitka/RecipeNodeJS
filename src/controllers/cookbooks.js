const cookbooksService = require("../services/cookbooksService");

exports.findAllForUser = async (req, res, next) => {
    try {
        let userId = req.body.userId;
        let all = await cookbooksService.findAllForUser(userId);
        return res.json(all);
    } catch (e) {
        next(e);
    }
};

exports.create = async (req, res, next) => {
    try {
        let {recipeId, userId} = req.body;
        let data = await cookbooksService.create({recipeId, userId});
        return res.json(data);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        let recipeId = req.params.recipeId;
        let userId = req.body.userId;
        let result = await cookbooksService.delete(recipeId, userId);
        return res.json(result);
    } catch (e) {
        next(e);
    }
};
