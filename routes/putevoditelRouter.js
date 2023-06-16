const Router = require('express')
const authmiddleware = require('../middleware/authmiddleware')
const putevoditelController = require('../controllers/putevoditelController')
const router = new Router()

router.get('/',authmiddleware,putevoditelController.putevoditel)
router.get('/officereg',authmiddleware,putevoditelController.officereg)
router.get('/news',authmiddleware,putevoditelController.news)
router.get('/news/:id',authmiddleware,putevoditelController.fullNews)
router.post('/news',authmiddleware,putevoditelController.getNews)
router.get('/anketirovenie',authmiddleware,putevoditelController.anketirovanie)


module.exports = router