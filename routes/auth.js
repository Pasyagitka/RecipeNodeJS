const { Router } = require('express');
const { validate } = require('express-validation');
const controller = require('../controllers/auth');
const validation = require('../helpers/validators/authValidation');

const authMiddleware = require('../middlewares/auth');
const router = new Router();

router.get('/login', controller.getLogin);
router.get('/register', controller.getRegister);

router.post('/register', validate(validation.register), controller.registration);
router.post('/login', validate(validation.login), controller.login);
router.get('/logout', controller.logout);

router.get('/activate/:link', validate(validation.activate), controller.activate);  //XXX email activation
router.get('/refresh', controller.refresh);

router.post('/reset-password', validate(validation.sendReset), controller.sendResetPassword);
router.get('/reset-password/:login/:link', validate(validation.resetConfirm), controller.resetConfirm);

router.get('/account', controller.getAccount);
router.post('/change-password', authMiddleware, validate(validation.changePassword), controller.changePassword);

router.get('/username', authMiddleware, controller.getUsername);
router.get('/user', authMiddleware, controller.getUser);

router.get('/forgot-password', controller.getForgotPassword);

module.exports = router;
