const Ingredients = require("../models").ingredients;
const {AlreadyExistsError, NotExistsError} = require('../errors/customError');

exports.findAll = async () => {
    let all = await Ingredients.findAll({
        raw : true,  
        nest : true
    });
    return all;
};


exports.create = async (name, measurement) => {
    const exists = await Ingredients.findOne( {where: { name }});
    if (exists) throw new AlreadyExistsError();
    let data = await Ingredients.create({name, measurement});
    return data;
};


exports.update = async (body) => {
    let {id, name} = body;
    const exists = await Ingredients.findOne( {where: { id }});
    const duplicateName = await Ingredients.findOne( {where: { name }});
    if (!exists) throw new NotExistsError();
    if (duplicateName) throw new AlreadyExistsError();

    let num = await Ingredients.update(body, { where: { id } }); 
    if (num == 1) {
        return (body);
    } 
    else return null;
}

exports.delete = async (id) => {
    const exists = await Ingredients.findOne( {where: { id }});
    if (!exists)  throw new NotExistsError();
    let num = await Ingredients.destroy({ where: { id} });
    if (num == 1) {
        return (exists);
    }
    else return null;
};
