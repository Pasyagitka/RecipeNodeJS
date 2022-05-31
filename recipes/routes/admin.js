const express = require('express');
//const { validate } = require('express-validation');

const router = express.Router();
const controller = require('../controllers/admin');

const authMiddleware = require('../middlewares/auth');
const authAdminMiddleware = require('../middlewares/auth-admin');

//const validation = require('../helpers/validators/cookbooksValidation');

router.get('/admincontent', controller.renderAdminContent);
router.get('/adminmoderate', controller.renderAdminModerate);

router.post('/admincontent', authMiddleware, authAdminMiddleware, controller.renderAdminContent);
router.post('/adminmoderate', authMiddleware, authAdminMiddleware, controller.getRecipesToModerate);
router.post('/adminrecipes', authMiddleware, authAdminMiddleware, controller.getRecipes);

router.put('/approve/:id', authMiddleware, authAdminMiddleware, controller.approveRecipe);
router.put('/disapprove/:id', authMiddleware, authAdminMiddleware, controller.disapproveRecipe);

module.exports = router;
