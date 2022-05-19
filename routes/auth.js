const { Router } = require('express');
const { validate } = require('express-validation');
const userController = require('../controllers/auth');
const validation = require('../helpers/validators/authValidation');

const router = new Router();

router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);

router.post('/register', validate(validation.register), userController.registration);
router.post('/login', validate(validation.login), userController.login);
router.get('/logout', userController.logout);

router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

router.post('/reset-password', validate(validation.sendReset), userController.sendResetPassword);
router.get('/reset-password/:login/:link', validate(validation.resetConfirm), userController.resetConfirm);

module.exports = router;