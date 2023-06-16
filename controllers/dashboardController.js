class dashboardController{
    async dashboard(req, res, next){
        try {
            console.log(req.session.student)
            return res.render('pages/dashboardPage.twig')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new dashboardController();