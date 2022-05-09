const Ingredients = require('../models').ingredients;
const { AlreadyExistsError, NotExistsError } = require('../helpers/errors/customError');

exports.findAll = async () => {
    const all = await Ingredients.findAll({
        raw: true,
        nest: true,
    });
    return all;
};

exports.create = async (name, measurement) => {
    const exists = await Ingredients.findOne({ where: { name } });
    if (exists) throw new AlreadyExistsError('ingredient (name)');

    const data = await Ingredients.create({
        name,
        measurement,
    });
    return data;
};

exports.update = async (data) => {
    const { id, name, measurement } = data;
    const exists = await Ingredients.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('ingredient');

    const duplicateName = await Ingredients.findOne({ where: { name } });
    if (duplicateName && duplicateName.id !== id) {
        throw new AlreadyExistsError('ingredient (name)');
    }

    const upd = await Ingredients.update({
        name,
        measurement: measurement ?? exists.measurement,
    }, { where: { id } });

    return upd ? data : null;
};

exports.delete = async (id) => {
    const exists = await Ingredients.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('ingredient');
    const result = await exists.destroy();
    return result ? exists : null;
};
