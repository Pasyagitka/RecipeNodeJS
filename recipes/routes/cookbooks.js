const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/cookbooks');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/cookbooksValidation');

router.get('/', controller.renderCookbook);
router.post('/', authMiddleware, controller.findAllForUser);
router.post('/add/:recipeId', authMiddleware, validate(validation.create), controller.create);
router.delete('/delete/:recipeId', authMiddleware, validate(validation.remove), controller.delete);

module.exports = router;
