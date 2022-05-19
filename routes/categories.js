const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/categoriesValidation');

router.get('/', controller.findAll);
router.post('/', validate(validation.create), controller.create);
router.put('/', validate(validation.update), controller.update);
router.delete('/:id', validate(validation.remove), controller.delete);

module.exports = router;
