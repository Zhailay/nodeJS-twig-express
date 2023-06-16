const mssql = require('mssql')
class profileController {
    async profile(req, res, next) {
        try {
            var stud = req.session.student;
    
            var Stud = await req.dbPool.request()
                .input('id_student', mssql.BigInt, stud.student_id)
                .execute('sp_student_profile');

            var Stud_predyd = await req.dbPool.request()
                .query(`select haracter_student_ru,ssharacter_student_ru
                    from haracter_student,ssharacter_student
                    where
                    id_haracter_student=haracter_student_id and
                    id_haracter_student in (20375,20376,20377,20378) and
                    id_student=${stud.student_id}`);
            console.log(Stud.recordset[0])
            return res.render('pages/profile/profilePage.twig', {
                student_info: Stud.recordset[0],
                student_files: Stud_predyd.recordset,
                fio: stud.student_fio
            });
        } catch (error) {
            console.log(error);
        }
    }
    async obhodnoi(req, res, next) {
        try{
            var stud = req.session.student;
            var rasp = await req.dbPool.request()
                .input('student_id', mssql.BigInt, stud.student_id)
                .input('gruppa_id', mssql.BigInt, stud.gruppa_id)
                .input('kontingent_kurs_id', mssql.BigInt, stud.kontingent_kurs_id)
                .execute('sp_obhodnoi_list_student');
            
            //console.log(rasp.recordset);
            return res.render('pages/obhodnoiPage', {
                tb: rasp.recordset
            });
            
        }catch(e){
            console.log(e);
            return res.send('database error');
        }
    }
}

module.exports = new profileController();