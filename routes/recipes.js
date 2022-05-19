const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/recipes');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/recipesValidation');

router.get('/', controller.getAllRecipes);
// router.post('/add', validate(validation.create), controller.create);
// router.put('/update', validate(validation.update), controller.update);
// router.delete('/delete/:id', validate(validation.remove), controller.delete);

router.get('/getJSON/:id', validate(validation.get),  controller.getRecipeJSON);
router.get('/get/:id', validate(validation.get),controller.getRecipe);

module.exports = router;
