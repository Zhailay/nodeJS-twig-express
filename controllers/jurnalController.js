class jurnalController{
    async jurnal(req, res, next){
        try {
            console.log(req.session.student)
            return res.render('pages/jurnalPage.twig')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new jurnalController();