async function getAdminModerate(req, res, next) {
    try {
        let recipeList = await recipesService.findAll();
        res.render('adminmoderate', { title: 'Admin moderate', recipeList  });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAdminModerate,
}