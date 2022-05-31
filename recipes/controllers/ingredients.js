const ingredientsService = require('../services/ingredientsService');

async function findAll(req, res, next) {
    try {
        const all = await ingredientsService.findAll();
        return res.json(all);
    } catch (e) {
        next(e);
    }
}

async function get(req, res, next) {
    try {
        let {id} = req.params;
        const all = await ingredientsService.findOne(id);
        return res.json(all);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const { name, measurement } = req.body;
        const data = await ingredientsService.create(name, measurement);
        return res.json(data);
    } catch (e) {
        next(e);
    }
}

async function update(req, res, next) {
    try {
        const num = await ingredientsService.update(req.body);
        return res.json(num);
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const num = await ingredientsService.delete(id);
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
