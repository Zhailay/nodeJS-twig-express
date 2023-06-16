const Router = require('express')
const authmiddleware = require('../middleware/authmiddleware')
const spravkiController = require('../controllers/spravkiController')
const zayavkiController = require('../controllers/zayavkiController')
const router = new Router()

router.get('/spravki',authmiddleware,spravkiController.spravki)
router.get('/spravki/oneclick',authmiddleware,spravkiController.oneClick)
router.get('/zayavki',authmiddleware,zayavkiController.zayavki)

module.exports = router