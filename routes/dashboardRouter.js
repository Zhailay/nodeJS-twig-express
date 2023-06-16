const Router = require('express')
const dashboardController = require('../controllers/dashboardController')
const authmiddleware = require('../middleware/authmiddleware')
const router = new Router()

router.get('/',authmiddleware,dashboardController.dashboard)

module.exports = router