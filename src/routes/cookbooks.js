var express = require('express');
const { Joi, validate } = require('express-validation');
var router = express.Router();
const controller = require('../controllers/cookbooks');
const authMiddleware = require('../middlewares/auth');
const validation = require('../helpers/validators/cookbooksValidation');


router.post("/", validate(validation.findAllForUser), controller.findAllForUser);
router.post("/add/", authMiddleware, validate(validation.create), controller.create);
router.delete("/:recipeId", authMiddleware, validate(validation.remove), controller.delete);

module.exports = router;