const mssql = require('mssql')

class spravkiController {
    async spravki(req, res, next) {
        try {
            // console.log(req.session.student)
            return res.render('pages/digitalservices/spravki/index.twig')
        } catch (error) {
            console.log(error);
        }
    }
    async oneClick(req, res, next) {
        try {
            const stud = req.session.student
            var Res = await req.dbPool.request()
                .input('id_student', mssql.BigInt, stud.student_id)
                .execute('sp_spravka_s_mesta_ucheby')
            var spravka = Res.recordset;

            return res.render('pages/digitalservices/spravki/oneClick.twig', {
                spravka: spravka,
                id_student: stud.student_id
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new spravkiController();