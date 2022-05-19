var express = require('express');
const controller = require('../controllers/index');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', controller.getIndex);

module.exports = router;
