class putevoditel{
    async putevoditel(req, res, next){
        try {
           
            return res.render('pages/putevoditel/index.twig')
        } catch (error) {
            console.log(error);
        }
    }
    async anketirovanie(req, res, next){
        try {
            return res.render('pages/putevoditel/anketirovanie.twig')
    
        } catch (e) {
            console.log(e);
            return res.send('database error');
        }
    }
    async officereg(req, res, next){
        try {
            return res.render('pages/putevoditel/officeReg.twig')
        } catch (error) {
            console.log(error);
        }
    }
    async news(req, res, next){
        try {
            const stud = req.session.student
            var category = await req.dbPool.request()
                .query('select * from post_news_category');
            return res.render('pages/news/newsPage', {
                stud: stud,
                category_list: category.recordset
            });
    
        } catch (e) {
            console.log(e);
            return res.send('database error');
        }
    }
    async getNews(req, res) {
        try {
            var id_post_news_category = req.body.id_post
            console.log(id_post_news_category)
            var category = await req.dbPool.request()
                .query(`
                select 
                    post_news_id,
                    post_news_title,
                    REPLACE(post_news_photo,'D:\\dot_system v2\\uploads','') as post_news_photo,
                    CONVERT(varchar,post_news_data,3) as post_news_data ,
                    post_news_data as post_news_sort 
                from 
                    post_news,
                    post_news_category
                where 
                    id_post_news_category=${id_post_news_category} and
                    post_news_category_id=id_post_news_category and 
                    post_news_data>'2022-08-01 10:16:03.543'
                order by post_news_sort desc`);
            var post_list = category.recordset
            console.log(post_list);
            return res.send(post_list)
    
        } catch (e) {
            console.log(e);
            return res.send('database error');
        }
    }
    async fullNews(req, res, next){
        try {
            const stud = req.session.student
            const id = req.params.id;
            var category = await req.dbPool.request()
                .query(`select post_news_title,post_news_description,REPLACE(post_news_photo,'D:\\dot_system v2\\uploads','') as post_news_photo,CONVERT(varchar,post_news_data,3) as post_news_data,post_news_category_name,sotrudnik_familiya+' '+sotrudnik_imya+' '+sotrudnik_otchestvo as sotrudnik_fio,post_news_category_id from post_news,sotrudnik,post_news_category where id_sotrudnik=sotrudnik_id and id_post_news_category=post_news_category_id and post_news_id=${id} and 
                post_news_data>'2022-08-01 10:16:03.543'`);
            var post_list = category.recordset
    
            var details = await req.dbPool.request()
                .query(`select post_news_attach_name,REPLACE(post_news_attach_value,'D:\\dot_system v2\\uploads','') as post_news_attach_value from post_news_attach where id_post_news=${id} and 
                post_news_data>'2022-08-01 10:16:03.543'`);
            var details_list = details.recordset
    
            var addStatus = await req.dbPool.request()
                .query(`begin if not exists(select post_news_monitoring_id from post_news_monitoring where id_post_news=${id} and id_student=${stud.student_id})
                        insert into post_news_monitoring
                        values(${id},${stud.student_id},GETDATE()) end`);
    
            return res.render('pages/news/newsFullPage', {
                stud: stud,
                post_list: post_list,
                details_list: details_list
            });
    
        } catch (e) {
            console.log(e);
            return res.send('database error');
        }
    }
}

module.exports = new putevoditel();