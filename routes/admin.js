const express = require('express');
//const { validate } = require('express-validation');

const router = express.Router();
const controllerContent = require('../controllers/adminContent');
const controllerModerate = require('../controllers/adminModerate');

const authMiddleware = require('../middlewares/auth');
const authAdminMiddleware = require('../middlewares/auth-admin');

//const validation = require('../helpers/validators/cookbooksValidation');

router.get('/admincontent', controllerContent.renderAdminContent);
router.get('/adminmoderate', controllerModerate.renderAdminModerate);

router.post('/admincontent', authMiddleware, authAdminMiddleware, controllerContent.renderAdminContent);
router.post('/adminmoderate', authMiddleware, authAdminMiddleware, controllerModerate.getRecipesToModerate);
router.post('/adminrecipes', authMiddleware, authAdminMiddleware, controllerModerate.getRecipes);

router.put('/approve/:id', authMiddleware, authAdminMiddleware, controllerModerate.approveRecipe);
router.put('/disapprove/:id', authMiddleware, authAdminMiddleware, controllerModerate.disapproveRecipe);


module.exports = router;
