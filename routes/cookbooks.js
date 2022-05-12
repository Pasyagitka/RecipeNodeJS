const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/cookbooks');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/cookbooksValidation');

router.get('/', controller.getCookbook);
router.post('/', validate(validation.findAllForUser), controller.findAllForUser);
router.post('/add', validate(validation.create), controller.create);
router.delete('/:recipeId', validate(validation.remove), controller.delete);


module.exports = router;
