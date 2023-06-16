var PASSWORD_ENCRYPT_KEY = "jinairgreenwings";
var StringCrypt = require('./StringCrypt.js');
var mssql = require('mssql')

class authController {
    async login(req, res, next) {
        try {
            return res.render('pages/loginPage.twig')
        } catch (error) {
            console.log(error);
            return res.status(401).send({message:'Ошибка сервера: повторите попытку!'})
        }
    }
    async check(req, res) {
        try {
            const {login, password} = req.body
            var encryptedPassword = StringCrypt.encrypt(password, PASSWORD_ENCRYPT_KEY);

            var candidate = await req.dbPool.request()
                .input('student_password_login', mssql.BigInt, login)
                .input('student_password_value', mssql.NVarChar, encryptedPassword)
                .execute(`sp_m_app_student_vhod`);
            var candidate_ = candidate.recordset[0];

            if (!candidate_) {
                return res.status(400).json({ message: `Логин или пароль не верны!` })
            }
            // console.log(candidate_)
            req.session.student = candidate_

            return res.status(200).json({ message:"Успешная авторизация!"})
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Ошибка сервера: повторите попытку!' })
        }
    }
    async logout(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            // console.log('token:',token)
            const decoded = await jwt.verify(token, secret);
            // Perform any other necessary logout logic
            return res.status(200).json({ message: 'Logout successful' });
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}

module.exports = new authController()