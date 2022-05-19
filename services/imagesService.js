const Recipes = require('../models').recipes;
const Images = require('../models').images;
const cloudinary = require('cloudinary').v2;

const { NotExistsError } = require('../helpers/errors/customError');

exports.findAllForRecipe = async (recipeId) => {
    const all = await Images.findAll({
        where: { recipeId },
        raw: true,
        nest: true,
    });
    return all;
};

exports.create = async ({id, file, description}) => {
    let resultF;
    const recipe = await Recipes.findOne({ where: { id } });
    if (!recipe) throw new NotExistsError('recipe');

    if(file)
    resultF = cloudinary.uploader.upload(file, function(error, result) { console.log(result, error); return result?.url;});
    
    const result = await Images.create({
        recipeId: recipe.id,
        uri: (await resultF)?.secure_url || 'https://res.cloudinary.com/dblablirp/image/upload/v1652823561/1024px-No_image_available.svg_kaq6mb.png',
        description: description,
    });
    return result;
};

exports.update = async ({recipeId, file, description}) => {
    let recipe, resultF;
    if (recipeId) {
        recipe = await Recipes.findOne({ where: { id: recipeId } });
        if (!recipe) throw new NotExistsError('recipe');
    }

    const exists = await Images.findAll({
        where: { recipeId },
        raw: true,
        nest: true,
    });
    //if (!exists) throw new NotExistsError('image');

    if(file) {
        resultF = cloudinary.uploader.upload(file, function(error, result) { console.log(result, error); return result?.url;});
    }

    const upd = await Images.update({
        uri: (await resultF)?.secure_url ?? exists?.uri,
        description: description ?? exists?.description,
    }, { where: { recipeId } });

    return upd ? 1 : null;
};

exports.delete = async (id) => {
    const exists = await Images.findOne({ where: { id } });
    if (!exists) throw new NotExistsError('image');
    const result = await exists.destroy();
    return result ? exists : null;
};
