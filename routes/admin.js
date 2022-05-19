const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
const controllerContent = require('../controllers/adminContent');
const controllerModerate = require('../controllers/adminModerate');

//const authMiddleware = require('../middlewares/auth');
//const validation = require('../helpers/validators/cookbooksValidation');

router.get('/admincontent', controllerContent.getAdminContent);
router.get('/adminmoderate', controllerModerate.getAdminModerate);

module.exports = router;


