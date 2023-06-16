class zayavkiController{
    async zayavki(req, res, next){
        try {
            console.log(req.session.student)
            return res.render('pages/digitalservices/zayavki/index.twig')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new zayavkiController();