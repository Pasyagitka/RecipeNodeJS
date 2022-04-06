const Meals = require('../models').meals;
const { AlreadyExistsError, NotExistsError } = require('../errors/customError');

exports.findAll = async () => {
    const all = await Meals.findAll({
        raw: true,
        nest: true,
    });
    return (all);
};

exports.create = async (meal) => {
    const exists = await Meals.findOne({ where: { meal } });
    if (exists) throw new AlreadyExistsError('meal');

    const result = await Meals.create({ meal });
    return result;
};

exports.update = async (data) => {
    const { id, meal } = data;
    const exists = await Meals.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('meal');

    const duplicateName = await Meals.findOne({ where: { meal } });
    if (duplicateName && duplicateName.id !== id) {
        throw new AlreadyExistsError('meal');
    }

    const upd = await Meals.update({
        meal,
    }, { where: { id } });
    return upd ? data : null;
};

exports.delete = async (id) => {
    const exists = await Meals.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('meal');
    const result = await exists.destroy();
    return result ? exists : null;
};
