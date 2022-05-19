const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/userRecipes');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/recipesValidation');

router.get('/', controller.renderUserRecipes);
router.post('/', authMiddleware, controller.findAllForUser);
router.get('/add', controller.renderAddRecipe);
router.post('/add', authMiddleware, validate(validation.create), controller.create);
router.put('/update', authMiddleware, controller.update);
router.delete('/delete/:id', authMiddleware, validate(validation.remove), controller.delete);

module.exports = router;
