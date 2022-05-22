const Categories = require('../models').categories;
const { AlreadyExistsError, NotExistsError } = require('../helpers/errors/customError');

exports.findAll = async () => {
    const all = await Categories.findAll({
        raw: true,
        nest: true,
    });
    return all;
};

exports.findOne = async (id) => {
    const all = await Categories.findByPk(id);
    return all;
};

exports.create = async (category) => {
    const exists = await Categories.findOne({ where: { category } });
    if (exists) throw new AlreadyExistsError();
    const data = await Categories.create({ category });
    return data;
};

exports.update = async (data) => {
    const { id, category } = data;
    const exists = await Categories.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('category');

    const duplicateName = await Categories.findOne({ where: { category } });
    if (duplicateName && duplicateName.id != id) {
        throw new AlreadyExistsError('category');
    }
    const upd = await Categories.update({
        category,
    }, { where: { id } });
    return upd ? data : null;
};

exports.delete = async (id) => {
    const exists = await Categories.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('category');
    const result = await exists.destroy();
    return result ? exists : null;
};

