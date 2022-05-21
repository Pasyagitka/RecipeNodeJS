const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/recipes');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/recipesValidation');

router.get('/', controller.getAllRecipesWithFilter);
// router.post('/add', validate(validation.create), controller.create);
// router.put('/update', validate(validation.update), controller.update);
// router.delete('/delete/:id', validate(validation.remove), controller.delete);

router.get('/getJSON/:id', validate(validation.get),  controller.getRecipe);
router.get('/get/:id', validate(validation.get), controller.renderRecipeDetails);

module.exports = router;
