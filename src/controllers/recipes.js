const recipesService = require('../services/recipesService');

exports.findAll = async (req, res, next) => {
    try {
        const all = await recipesService.findAll();
        return res.json(all);
    } catch (e) {
        next(e);
    }
};

exports.create = async (req, res, next) => {
    try {
        const data = await recipesService.create(req.body);
        return res.json(data);
    } catch (e) {
        next(e);
    }
};

exports.update = async (req, res, next) => {
    try {
        const num = await recipesService.update(req.body);
        return res.json(num);
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const num = await recipesService.delete(id);
        return res.json(num);
    } catch (e) {
        next(e);
    }
};
