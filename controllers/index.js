const recipesService = require('../services/recipesService');
const categoriesService = require('../services/categoriesService');
const mealsService = require('../services/mealsService');
const ingredientsService = require('../services/ingredientsService');
//add to cookbook/remove from cookbook

// async function getIndex(req, res, next) {
//     try {
//         let meals = await mealsService.findAll();
//         let categories = await categoriesService.findAll();
//         let ingredients = await ingredientsService.findAll();
//         const filters = req.query;
//         let categoriesFilter = filters.category?.split(',');
//         let mealsFilter = filters.meal?.split(',');
//         let includesFilter = filters.include?.split(',');
//         let excludesFilter = filters.exclude?.split(',');
//         console.log(categoriesFilter, mealsFilter, includesFilter, excludesFilter)
//         let recipeList = await recipesService.findAllFiltered(categoriesFilter, mealsFilter, includesFilter, excludesFilter);

        
//         res.render('main', { title: 'Recipes', recipeList, categories, meals, ingredients  });
//     } catch (e) {
//         next(e);
//     }
// }

// async function getIndex(req, res, next) {
//     try {
//         let meals = await mealsService.findAll();
//         let categories = await categoriesService.findAll();
//         let data = await recipesService.findAll();
//         let ingredients = await ingredientsService.findAll();
//         console.log(req.query);
//         let filters = {
//             category: req.query.category?.split(',') || null, 
//             meal: req.query.meal?.split(',') || null, 
//             include: req.query.include?.split(',') || null, 
//             exclude: req.query.exclude?.split(',') || null, 
//         };
//         // let {category, meal, includeIngr, excludeIngr} = req.query;
//         // let filters = { category, meal, includeIngr, excludeIngr};
//         // console.log(filters);


//         let recipeList = data.filter(r => { 
//             console.log(r.recipe_ingredients)
//             let intersection = r.recipe_ingredients.filter(x => filters.include?.includes(x));
//             console.log(intersection);
//             let fCat = filters.category?.includes(r.category.category);
//             let fMea = filters.meal?.includes(r.meal.meal);
//             let fInc = filters.include?.includes(r.recipe_ingredients.ingredient?.name);
//             let fExc = !filters.exclude?.includes(r.recipe_ingredients.ingredient?.name);
//             console.log(fCat, fMea, fInc, fExc, filters);
//             let res = 
//                 (filters.category? fCat : true) && 
//                 (filters.meal? fMea : true) && 
//                 (filters.include? fInc: true) && 
//                 (filters.exclude? fExc: true);
//             console.log(res)
//             return res
//         });
        
//         // const recipeList = data.filter(r => {
//         //     let isValid = true;
//         //     for (key in filters) {
//         //       let byKeys = filters[key]?.split(',');
//         //         console.log(key, r[key]?.key, byKeys);
//         //       let inc = byKeys?.includes(r[key]?.key) || false;
//         //       console.log(inc);
//         //       isValid = isValid && inc;
//         //     }
//         //     return isValid;
//         // });
//         res.render('main', { title: 'Recipes', recipeList, categories, meals, ingredients  });
//     } catch (e) {
//         next(e);
//     }
// }

//recipes & filter

async function getIndex(req, res, next) {
    try {
        let meals = await mealsService.findAll();
        let categories = await categoriesService.findAll();
        let data = await recipesService.findAll();
        let ingredients = await ingredientsService.findAll();
        
        // const filters = req.query;
        // const recipeList = data.filter(r => {
        //     let isValid = true;
        //     for (key in filters) {
        //       let keys = filters[key].split(',');
        //       console.log(key, r[key][key], filters[key]);
        //       isValid = isValid &&  keys.includes(r[key][key]);
        //     }
        //     return isValid;
        // });
        res.render('main', { title: 'Recipes', categories, meals, ingredients, username: req.user?.email  });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getIndex,
};
