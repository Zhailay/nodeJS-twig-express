const Router = require('express');
const authController = require('../controllers/authController');
const router = new Router();

router.get('/', authController.login)
router.post('/', authController.check)

module.exports = router