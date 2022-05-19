const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/cookbooks');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/cookbooksValidation');

router.get('/', controller.getCookbook);
router.post('/', authMiddleware, validate(validation.findAllForUser), controller.findAllForUser);

router.post('/add/:recipeId', authMiddleware, validate(validation.create), controller.create);
router.delete('/delete/:recipeId', authMiddleware, validate(validation.remove), controller.delete);


module.exports = router;
