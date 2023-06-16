module.exports = function(req, res, next) {
    if (req.method === "OPTIONS"){
        next()
    }
    try {
        if(!req.session.student){
            return res.redirect('/auth')
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({message:"Пользователь не авторизован!"})
    }
}