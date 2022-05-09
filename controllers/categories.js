const categoriesService = require('../services/categoriesService');

async function findAll(req, res, next) {
    try {
        const all = await categoriesService.findAll();
        return res.json(all);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const { category } = req.body;
        const data = await categoriesService.create(category);
        return res.json(data);
    } catch (e) {
        next(e);
    }
}

async function update(req, res, next) {
    try {
        const num = await categoriesService.update(req.body);
        return res.json(num);
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const num = await categoriesService.delete(id);
        return res.json(num);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    findAll,
    create,
    update,
    delete: remove,
};
