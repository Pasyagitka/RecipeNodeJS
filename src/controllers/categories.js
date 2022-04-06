const categoriesService = require("../services/categoriesService");

exports.findAll = async (req, res, next) => {
    try {
        let all = await categoriesService.findAll();
        return res.json(all);
    } catch (e) {
        next(e);
    }
};


exports.create = async (req, res, next) => {
    try {
        let {category} = req.body;
        let data = await categoriesService.create(category);
        return res.json(data);
    } catch (e) {
        next(e);
    }
};


exports.update = async (req, res, next) => {
    try {
        let num = await categoriesService.update(req.body);
        return res.json(num);
    } catch (e) {
        next(e);
    }
}

exports.delete = async (req, res, next) => {
    try {
        let id = req.params.id;
        let num = await categoriesService.delete(id);
        return res.json(num);
    } catch (e) {
        next(e);
    }
};
