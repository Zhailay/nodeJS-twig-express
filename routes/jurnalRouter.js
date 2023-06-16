const Router = require('express')
const authmiddleware = require('../middleware/authmiddleware')
const jurnalController = require('../controllers/jurnalController')
const router = new Router()

router.get('/',authmiddleware,jurnalController.jurnal)

module.exports = router