const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/meals');
const authMiddleware = require('../middlewares/auth');
const authAdminMiddleware = require('../middlewares/auth-admin');

const validation = require('../helpers/validators/mealsValidation');

router.get('/', authMiddleware, authAdminMiddleware, controller.findAll);
router.get('/:id', authMiddleware, authAdminMiddleware, controller.get);
router.post('/', authMiddleware, authAdminMiddleware, validate(validation.create), controller.create);
router.put('/', authMiddleware, authAdminMiddleware, validate(validation.update), controller.update);
router.delete('/:id', authMiddleware, authAdminMiddleware, validate(validation.remove), controller.delete);

module.exports = router;
