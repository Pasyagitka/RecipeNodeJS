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
        let num = await categoriesService.delete(id);
        if (num == 1) {
           return res.json(exists);
        }
        else return res.send(''); //todo remove?
    } catch (e) {
        next(e);
    }
};
