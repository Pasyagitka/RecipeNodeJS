const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/categoriesValidation');

router.get('/', controller.findAll);
router.post('/', authMiddleware, validate(validation.create), controller.create);
router.put('/', authMiddleware, validate(validation.update), controller.update);
router.delete('/:id', authMiddleware, validate(validation.remove), controller.delete);

module.exports = router;
