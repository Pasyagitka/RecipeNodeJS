const Categories = require("../models").categories;
const {AlreadyExistsError, NotExistsError} = require('../errors/customError');

exports.findAll = async () => {
    let all = await Categories.findAll({
        raw : true,  
        nest : true
    });
    return all;
};


exports.create = async (category) => {
    const exists = await Categories.findOne( {where: { category }});
    if (exists) throw new AlreadyExistsError();
    let data = await Categories.create({category});
    return data;
};


exports.update = async (body) => {
    let {id, category} = body;
    const exists = await Categories.findOne( {where: { id }});
    const duplicateName = await Categories.findOne( {where: { category }});
    if (!exists)  throw new NotExistsError();
    if (duplicateName) throw new AlreadyExistsError();
    let num = await Categories.update(body, { where: { id } }); 
    if (num == 1) {
        return (body);
    } 
    else return null;
}

exports.delete = async (id) => {
    const exists = await Categories.findOne( {where: { id }});
    if (!exists)  throw new NotExistsError();
    let num = await Categories.destroy({ where: { id} });
    if (num == 1) {
        return (exists);
    }
    else return null; //todo remove?
};

