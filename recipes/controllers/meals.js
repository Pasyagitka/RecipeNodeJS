const mealsService = require('../services/mealsService');

async function findAll(req, res, next) {
    try {
        const all = await mealsService.findAll();
        return res.json(all);
    } catch (e) {
        next(e);
    }
}

async function get(req, res, next) {
    try {
        let {id} = req.params;
        const all = await mealsService.findOne(id);
        return res.json(all);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const { meal } = req.body;
        const data = await mealsService.create(meal);
        return res.json(data);
    } catch (e) {
        next(e);
    }
}

async function update(req, res, next) {
    try {
        const num = await mealsService.update(req.body);
        return res.json(num);
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const num = await mealsService.delete(id);
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
    get,
};
