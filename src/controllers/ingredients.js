const ingredientsService = require("../services/ingredientsService");


exports.findAll = async (req, res, next) => {
    try {
        let all = await ingredientsService.findAll();
        return res.json(all);
    } catch (e) {
        next(e);
    }
};



exports.create = async (req, res, next) => {
    try {
        let {name, measurement} = req.body;
        let data = await ingredientsService.create(name, measurement);
        return res.json(data);
    } catch (e) {
        next(e);
    }
};


exports.update = async (req, res, next) => {
    try {
        let num = await ingredientsService.update(req.body);
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
        let num = await ingredientsService.delete(id);
        if (num == 1) {
           return res.json(exists);
        }
        else return res.send('');
    } catch (e) {
        next(e);
    }
};
