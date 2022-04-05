const Meals = require("../models").meals;
const {AlreadyExistsError, NotExistsError} = require('../errors/customError');

exports.findAll = async () => {
    let all = await Meals.findAll({
        raw : true,  
        nest : true
    });
    return (all);
};


exports.create = async (meal) => {
    const exists = await Meals.findOne( {where: { meal }});
    if (exists) throw new AlreadyExistsError();
    let data = await Meals.create({meal});
    return (data);
};


exports.update = async (body) => {
    let {id, meal} = body;
    const exists = await Meals.findOne( {where: { id }});
    const duplicateName = await Meals.findOne( {where: { meal }});
    if (!exists) throw new NotExistsError();
    if (duplicateName) throw new AlreadyExistsError();

    let num = await Meals.update(body, { where: { id } }); 
    if (num == 1) {
        return (body);
    } 
    else return null;
}

exports.delete = async (id) => {
    const exists = await Meals.findOne( {where: { id }});
    if (!exists) throw new NotExistsError();
    let num = await Meals.destroy({ where: { id} });
    if (num == 1) {
        return (exists);
    }
    else return null;
};
