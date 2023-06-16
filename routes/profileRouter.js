const Router = require('express')
const authmiddleware = require('../middleware/authmiddleware')
const profileController = require('../controllers/profileController')
const router = new Router()

router.get('/',authmiddleware,profileController.profile)
router.get('/obhodnoi',authmiddleware,profileController.obhodnoi)

module.exports = router