const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/recipes');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/recipesValidation');

router.get('/', controller.findAll);
router.post('/', authMiddleware, validate(validation.create), controller.create);
router.put('/', authMiddleware, validate(validation.update), controller.update);
router.delete('/:id', authMiddleware, validate(validation.remove), controller.delete);

router.get('/userrecipes', controller.getUserRecipes);
router.get('/addrecipe', controller.getAddRecipes);
router.get('/recipe', controller.getRecipe);


module.exports = router;
