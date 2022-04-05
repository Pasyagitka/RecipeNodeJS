const mealsService = require("../services/mealsService");


exports.findAll = async (req, res, next) => {
    try {
        let all = await mealsService.findAll();
        return res.json(all);
    } catch (e) {
        next(e);
    }
};


exports.create = async (req, res, next) => {
    try {
        let {meal} = req.body;
        let data = await mealsService.create(meal);
        return res.json(data);
    } catch (e) {
        next(e);
    }
};


exports.update = async (req, res, next) => {
    try {
        let num = await mealsService.update(req.body);
        if (num == 1) {
            return res.json(req.body);
        } 
        else return res.send('');
    } catch (e) {
        next(e);
    }
}

exports.delete = async (req, res, next) => {
    try {
        let id = req.params.id;
        let num = await mealsService.delete(id);
        if (num == 1) {
           return res.json(exists);
        }
        else return res.send('');
    } catch (e) {
        next(e);
    }
};
