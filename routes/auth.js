const { Router } = require('express');
const { validate } = require('express-validation');
const userController = require('../controllers/auth');
const validation = require('../helpers/validators/authValidation');

const router = new Router();

//TODO auth errors and redirects
router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);

router.post('/register', validate(validation.register), userController.registration);
router.post('/login', validate(validation.login), userController.login);
router.get('/logout', userController.logout);

router.get('/activate/:link', userController.activate);  //XXX email activation
router.get('/refresh', userController.refresh); //XXX refresh token?

router.post('/reset-password', validate(validation.sendReset), userController.sendResetPassword); //XXX reset password
router.get('/reset-password/:login/:link', validate(validation.resetConfirm), userController.resetConfirm);

module.exports = router;
