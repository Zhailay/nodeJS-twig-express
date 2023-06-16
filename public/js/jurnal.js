// const TAB_CUR_CONTROL = 0;
// const TAB_R1 = 1;
// const TAB_R2 = 2;
// const TAB_ITOG = 3;

// var tab = TAB_CUR_CONTROL;

// $('.journal-tab').click(function () {
//     $('.journal-active-tab').removeClass('journal-active-tab');
//     $(this).addClass('journal-active-tab');

// });

// $('#Rating1').click(function () {
//     tab = TAB_R1;
//     load();
// });
// $('#Rating2').click(function () {
//     tab = TAB_R2;
//     load();
// });
// $('#Itog').click(function () {
//     tab = TAB_ITOG;
//     load();
// });
// $('#CurControl').click(function () {
//     tab = TAB_CUR_CONTROL;
//     load();
// });

// function load() {

//     switch (tab) {
//         case TAB_CUR_CONTROL: loadCurrentWeek(); break;
//         case TAB_R1: loadRating(); break;
//         case TAB_R2: loadRating2(); break;
//         case TAB_ITOG: loadItog(); break;
//     }

// }

// function loadCurrentWeek(){
//     console.log('loadCurrentWeek')
// }
// function loadRating(){
//     console.log('loadRating')
// }
// function loadRating2(){
//     console.log('loadRating2')
// }
// function loadItog(){
//     console.log('loadRating2')
// }



$(function () {

    var MAX_PROPUSK = 25;

    var TAB_CUR_CONTROL = 0;
    var TAB_R1 = 1;
    var TAB_R2 = 2;
    var TAB_ITOG = 3;

    var tab = TAB_CUR_CONTROL;

    $('#Rating1').click(function () {
        tab = TAB_R1;
        load();
    });
    $('#Rating2').click(function () {
        tab = TAB_R2;
        load();
    });
    $('#Itog').click(function () {
        tab = TAB_ITOG;
        load();
    });
    $('#CurControl').click(function () {
        tab = TAB_CUR_CONTROL;
        load();
    });

    $('#Reg').click(function () {
        location.href = '/reg';
    });

    $('#Rasp').click(function () {

        $.get('/raspisanie/json', function (rasps) {

            $('#StudentTable').empty();
            $("#iup_div").empty();
            $("#iup_div_f").empty();
            $("#GraficTable").empty();

            $('#StudentTable').append(`
                <tr>
                    <th>№</th>
                    <th>День</th>
                    <th>Урок</th>
                    <th>Время</th>
                    <th>Наименование дисциплины</th>
                    <th>Вид занятия</th>
                    <th>Фио преподавателя</th>
                    <th>Аудитория</th>
                    <th>Ссылка ВКС</th>
                    <th>Логин/пароль ВКС</th>
                </tr>`);

            var i = 0;

            for (var rasp of rasps) {
                i++;

                $('#StudentTable').append(`
                    <tr>
                        <th>${i}</th>
                        <th>${rasp.den_short_ru}</th>
                        <th>${rasp.urok_nomer}</th>
                        <th>${rasp.urok_vremya}</th>
                        <th>${rasp.disciplina_name}</th>
                        <th>${rasp.haracter_rup_ru}</th>
                        <th>${rasp.sotrudnik_fio}</th>
                        <th>${rasp.aud_name}</th>
                        <th><a href="${rasp.ssylka_vks}">${rasp.ssylka_vks}</a></th>
                        <th>${rasp.login_password_vks}</th>
                    </tr>`);
            }

        })

    });

    $('#Iup').click(function () {
        var id_group = $('#Group').val();
        var id_kontingent_kurs = $('#Group option:selected').data('id_kontngent_kurs');

        $('#StudentTable').empty();
        $("#iup_div").empty();
        $("#iup_div_f").empty();
        $("#GraficTable").empty();
        $.post('/iup/get', { id_group: id_group, id_kontingent_kurs: id_kontingent_kurs }, function (discips) {

            if (!discips || discips == 'error')
                return alert('ошибка запроса');

            $("#iup_div").append(`
            <h3 style=" text-align: right;">${discips.shapka[0].shapka1}</h3>

                <div style="margin-left: 5px;margin-top: 5px;float:right;" id="qrcode2" class="header-picture"></div>
                
                <h3 style=" text-align: center;margin-top:160px">${discips.shapka[0].shapka2}</h3>
                <h3 style=" text-align: left;">${discips.shapka[0].shapka3}</h3>
                <h3 style=" text-align: center;margin-bottom: -15px;">${discips.shapka[0].shapka4}</h3>
            `)

            var jurnalHtml=``
            for( jurnalZ of discips.tb){ 
                jurnalHtml=`
                <tr>
                    <td ${jurnalZ.disciplina_id == '' ? `colspan="${jurnalZ.colspan}"`:``} ${jurnalZ.nomer.length > 5 ? `style="text-align: center;font-weight: bold;"`:``}>${jurnalZ.nomer}</td>
                    ${jurnalZ.disciplina_id == '' ? '':`<td>${jurnalZ.disciplina_id}</td>`}
                    ${jurnalZ.disciplina_name == '' ? '':`<td style="${jurnalZ.individ > 0 ? 'font-style: italic;':''}">${jurnalZ.disciplina_name}</td>`}
                    ${jurnalZ.kredit == '' ? '':`<td id="${jurnalZ.sostavnaya_disciplina_id == 0 ? `${Math.floor(Math.random() * 100)}`:`${jurnalZ.sostavnaya_disciplina_id}`}">${jurnalZ.kredit}</td>`}
            
                </tr>
                `
                $('#StudentTable').append(jurnalHtml)
            }



            $("#iup_div_f").append(`
               <h3>${discips.shapka[0].shapka5}</h3> <div style="margin-left: 0px;
               margin-top: 20px;" id="qrcode" class="header-picture"></div>
            `)
            
            for( jurnalZ of discips.tb_gr){ 
                $("#GraficTable").append(`
                <tr>
                    <td ${jurnalZ.period_data == '' ? `colspan='2'`:``}>${jurnalZ.period_nomer}</td>
                    ${jurnalZ.period_data == '' ? ``:`<td>${jurnalZ.period_data}</td>`}
                </tr>
                `);
            }
            var currentID;
            var count = 1;
            var lastRow;
            $("#StudentTable > tr").each(function () {
       
              var id = $(this).find(':last-child').attr("id");
              if (id === currentID) {
                count++;
                $(this).find(':last-child').remove();
              } else {
                $(lastRow).find(':last-child').attr("rowspan", count)
                currentID = id;
                count = 1;
                lastRow = this;
              }
            });
            
            if (count !== 1) {
              $(lastRow).find(':last-child').attr("rowspan", count);
            }

            var url = `https://student.zhetysu.edu.kz:8059/list-student/${discips.shapka[0].student_id}`
           // new QRCode(document.getElementById("qrcode"), url);
            var qr_link = $("#qr_link")
            qr_link.html(url)
            var qrcode = new QRCode("qrcode", {
                text: url,
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });

            var url2 = `http://prepod.zhetysu.edu.kz:8050/${discips.shapka[0].sotrudnik_id}`
           // new QRCode(document.getElementById("qrcode"), url);
            var qr_link = $("#qr_link2")
            qr_link.html(url2)
            var qrcode2 = new QRCode("qrcode2", {
                text: url2,
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        });
    });

    function filter(str) {
        return !str ? '' : str.replace(/[�]/g, '');
    }

    $('#Trans').click(function () {

        $('#StudentTable').empty();
        $("#iup_div").empty();
        $("#iup_div_f").empty();
        $("#GraficTable").empty();

        $('#StudentTable').append(`
        <tr>
            <th rowspan="2">№п/п</th>
            <th rowspan="2">Пәндер аты/Courses/Наименование дисциплины</th>
            <th rowspan="2">Количество акад. кред. - ECTS / Акад. кред. - ECTS саны</th>
            <th colspan="4">Баға/Grade/Оценка</th>
        </tr>
        <tr>
            <th>пайызбен/pe rsentage/в процентах</th>
            <th>әріппен/alph abetic/букве нная</th>
            <th>балмен/in points/в баллах</th>
            <th>дәстүрлі/trad itional/тради ционная</th>
        </tr>
        <tr>
            <td colspan="7" style="font-size: 24px; text-align: center; color: #666; padding: 10px;">Формирование транскрипта...</td>
        </tr>`);

        var id_gruppa = $('#Group').val();
        var id_kontingent_kurs = $('#Group option:selected').data('id_kontngent_kurs');
        var kurs = $('#Group option:selected').data('kurs_nomer');

        var start = 1; //kurs * 2 - 1;
        var end = kurs * 2;

        $.post('/get-transcript', {
            id_gruppa: id_gruppa,
            id_kontingent_kurs: id_kontingent_kurs,
            start: start,
            end: end,
            kurs_nomer: kurs
        }, function (res) {

            if (!res) return;

            var rows = res.rows;

            $('#StudentTable tr:gt(1)').remove();

            var i;

            for (var sem = (start == 1 ? 0 : start); sem <= end; sem++) {

                var semRows = rows.filter(r => r.period_nomer == sem);

                var semTag = `${sem} - семестр`;

                if (sem == 0)
                    semTag = 'Перезачеты из приложения';

                if (semRows.length > 0) {
                    $('#StudentTable').append(`<tr>
                        <td colspan="7" style="text-align: center; font-weight: bold; padding: 10px 0">${semTag}</td>
                    </tr>`);
                }

                var teors = semRows.filter(r => r.disciplina_type != 'Практика');
                var prak = semRows.filter(r => r.disciplina_type == 'Практика');

                i = 0;

                for (var row of teors) {
                    i++;

                    $('#StudentTable').append(`<tr>
                        <td style="text-align: center">${i}</td>
                        <td>${filter(row.disciplina_name)}</td>
                        <td style="text-align: center">${row.ssharacter_rup_student_kredit}</td>
                        <td style="text-align: center">${row.ball}</td>
                        <td style="text-align: center">${row.bukva}</td>
                        <td style="text-align: center">${row.gpa_ball}</td>
                        <td style="text-align: center">${row.trad}</td>
                    </tr>`);
                }

                i = 0;
                if (prak.length > 0) {
                    $('#StudentTable').append(`<tr>
                        <td colspan="7" style="text-align: center; font-weight: bold; padding: 10px 0">Іс-тәжірибе / Практика</td>
                    </tr>`);

                    for (var row of prak) {
                        i++;

                        row.disciplina_name = filter(row.disciplina_name);

                        $('#StudentTable').append(`<tr>
                            <td style="text-align: center">${i}</td>
                            <td>${filter(row.disciplina_name)}</td>
                            <td style="text-align: center">${row.ssharacter_rup_student_kredit}</td>
                            <td style="text-align: center">${row.ball}</td>
                            <td style="text-align: center">${row.bukva}</td>
                            <td style="text-align: center">${row.gpa_ball}</td>
                            <td style="text-align: center">${row.trad}</td>
                        </tr>`);
                    }
                }



            }

            $('#StudentTable').append(`<tr>
                    <td colspan="7" style="text-align: left; font-weight: bold; padding: 10px 0">
                    <br>
                        Общее количество кредитов: ${res.totalKredit}<br>
                        GPA: ${res.gpa}<br><br>

                        Общее количество кредитов (текущий курс): ${res.totalKreditC}<br>
                        GPA (текущий курс): ${res.gpaC}<br>
                    </td>
                </tr>`);

        });

    });

    $('#Summer').click(function () {

        $('#StudentTable').empty();
        $("#iup_div").empty();
        $("#iup_div_f").empty();
        $("#GraficTable").empty();

        $('#StudentTable').append(`
        <tr>
            <th>№п/п</th>
            <th>Дисциплина</th>
            <th>Количество акад.кредитов</th>
            <th>Семестр</th>
            <th>Выбор на летний семестр</th>
        </tr>
        <tr>
            <td colspan="7" style="font-size: 24px; text-align: center; color: #666; padding: 10px;">Выполняется запрос...</td>
        </tr>`);

        var id_gruppa = $('#Group').val();
        var id_kontingent_kurs = $('#Group option:selected').data('id_kontngent_kurs');
        var kurs = $('#Group option:selected').data('kurs_nomer');

        var start = 1;
        var end = kurs * 2;

        $.post('/summer', {
            id_gruppa: id_gruppa,
            id_kontingent_kurs: id_kontingent_kurs,
            start: start,
            end: end
        }, function (rows) {

            if (!rows) return;

            $('#StudentTable tr:gt(0)').remove();

            rows = rows.filter(r => r.bukva == 'F' && r.disciplina_type != "Летний семестр" && r.rup_student_flag == 0);

            var i;

            if (rows.length == 0) {
                $('#StudentTable').append(`<tr>
                    <td colspan="7" style="text-align: center; font-weight: bold; padding: 10px 0">У вас нет задолженности</td>
                </tr>`);
            }

            i = 0;

            for (var row of rows) {
                i++;

                var cbxHTML = row.isSended ? '<span style="color: #0A0">Отправлено</span>' : `<input class="cbx" data-rup_id="${row.rup_id}" type="checkbox">`;

                $('#StudentTable').append(`<tr>
                    <td style="text-align: center">${i}</td>
                    <td style="${row.is_pre == 1 ? 'color: red' : ''}">${filter(row.disciplina_name)} ${row.is_pre == 1 ? '(ПРЕРЕКВЕЗИТ)' : ''}</td>
                    <td style="text-align: center">${row.ssharacter_rup_student_kredit}</td>
                    <td style="text-align: center">${row.period_nomer}</td>
                    <td style="text-align: center">
                        ${cbxHTML}
                    </td>
                </tr>`);
            }

            $('#StudentTable').append(`<tr>
                <td colspan="4" style="text-align: center; border: none; padding: 5px"><button id="ShowSummerDialog">Подать заявление на летний семестр</button></td>
            </tr>`);

            $('#ShowSummerDialog').unbind().click(function () {

                console.log(id_gruppa, id_kontingent_kurs);

                $.post('/journal/info', {
                    id_group: id_gruppa,
                    id_kontingent_kurs: id_kontingent_kurs
                }, function (stud) {

                    var xml = '';
                    var tblHTML = '';

                    $('.cbx:checked').each(function (i, el) {
                        var id = $(el).data('rup_id');
                        xml += `<X rup_id="${id}" />`;

                        var row = rows.find(r => r.rup_id == id);

                        console.log(rows);

                        tblHTML += `<tr>
                        <td style="text-align: center">${i + 1}</td>
                        <td>${filter(row.disciplina_name)}</td>
                        <td style="text-align: center">${row.ssharacter_rup_student_kredit}</td>
                        <td style="text-align: center">${row.period_nomer}</td>
                        </tr>`;
                    });

                    $('#BtnSummerSend').unbind().click(function () {

                        console.log(xml);

                        $.post('/journal/summer-send', {
                            id_group: id_gruppa,
                            id_kontingent_kurs: id_kontingent_kurs,
                            xml: xml
                        }, function () {
                            $('#Summer').click();
                            $('#SummerDialog').hide();
                        });

                    });

                    $('#SummerDialog').show();

                    $('#SummerReport').html(`
                        <div>
                            Фио: <b>${stud.student_fio}</b><br>
                            Группа: <b>${stud.gruppa_ru}</b><br>
                            Форма обучения: <b>${stud.shablon_kontingent_ru}</b><br>
                            Факультет: <b>${stud.fac_name}</b><br>
                            Язык обучения: <b>${stud.otdelenie_ru}</b>
                        </div>
                        <br><br><br><br>
                        <p style="text-align: center; font-size: 20px">Заявление</p>
                        <p style="text-align: center; font-size: 20px">Прошу зарегистрировать меня на изучение дисциплин в летнем семестре <br>${stud.start_year}/${stud.end_year} уч.года</p>
                        <table>
                        <tr>
                            <th>№п/п</th>
                            <th>Дисциплина</th>
                            <th>Количество акад.кредитов</th>
                            <th>Семестр</th>
                        </tr>
                        ${tblHTML}
                        </table>
                        <br><br><br>
                        <p style="text-align: center; font-size: 20px">${stud.dt}</p>
                        <br><br><br>
                    `);
                });

            });

        });

    });

    $('#Group').change(function () {
        var kurs = $('#Group option:selected').data('kurs_nomer');
        var shablon_kontingent_id = $('#Group option:selected').data('shablon_kontingent_id');

        /*if(shablon_kontingent_id == 2 && kurs == 3)
                $('#CurWeek').text(parseInt($('#CurWeek').text()) + 1);*/

        //$('#CurWeek').text(5);

        if (shablon_kontingent_id == 13 || shablon_kontingent_id == 15) {
            $('#Rating1').text('Атестация 1');
            $('#Rating2').text('Атестация 2');
        } else {
            $('#Rating1').text('Рейтинг допуска 1');
            $('#Rating2').text('Рейтинг допуска 2');
        }

        var ch = SETTINGS.ssjurnal_nastr_chetnost;
        var sem = kurs * 2 - ch;

        console.log('semestr: ', sem);

        $('#Sem').val(sem);

        if ([3, 6].indexOf(shablon_kontingent_id) > -1) {
            $('#Rating1').hide();
            $('#Rating2').hide();
            $('#CurControl').hide();
            $('#Itog').click();
        } else {
            $('#Sem').change();
        }

    });

    $('#Sem').change(function () {
        load();
    });

    $('#Group').change();

    $('.journal-tab').click(function () {
        $('.journal-active-tab').removeClass('journal-active-tab');
        $(this).addClass('journal-active-tab');

    });

    function loadItog() {

        $('#Loader').show();

        $('#StudentTable').empty();
        $("#iup_div").empty();
        $("#iup_div_f").empty();
        $("#GraficTable").empty();

        var id_gruppa = $('#Group').val();
        var id_kontingent_kurs = $('#Group option:selected').data('id_kontngent_kurs');
        var shablon_kontingent_id = $('#Group option:selected').data('shablon_kontingent_id');
        var sem = $('#Sem').val();

        var eumoCol = '';

        if (shablon_kontingent_id == 3 || shablon_kontingent_id == 6)
            eumoCol = '<td>ЭУМО</td>';

        console.log('shablon_kontingent_id', shablon_kontingent_id);

        $('#StudentTable').append(`<tr>
                <td>Дисциплина</td>
                ${eumoCol}
				<td>R1</td>
				<td>R2</td>
                <td colspan="2" style="text-align: center">Рейтинг</td>
		        <td style="text-align: center">Экзамен</td>
                <td style="text-align: center">Апеляция</td>
                <td style="text-align: center">Общий балл</td>
            </tr>`);

        var totalDiscips = [];

        $.post('/journal/itog', { id_gruppa: id_gruppa, period_nomer: sem }, function (discips) {
            $('#Loader').hide();

            var m3Flag = false;
            var m4Flag = false;

            var kurs = $('#Group option:selected').data('kurs_nomer');

            for (var dis of discips) {

                var m3 = dis.disciplina_name.indexOf("ҚБ") > -1 || dis.disciplina_name.indexOf("ОЗ") > -1;
                var m4 = dis.disciplina_name.indexOf("ӘБМ") > -1 || dis.disciplina_name.indexOf("СПЗ") > -1;

                var m3Count = discips.filter(dis => dis.disciplina_name.indexOf("ҚБ") > -1 || dis.disciplina_name.indexOf("ОЗ") > -1).length;
                var m4Count = discips.filter(dis => dis.disciplina_name.indexOf("ӘБМ") > -1 || dis.disciplina_name.indexOf("СПЗ") > -1).length;

                var m3First = false, m4First = false;

                if (m3 && !m3Flag) {
                    m3Flag = true;
                    m3First = true;
                }

                if (m4 && !m4Flag) {
                    m4Flag = true;
                    m4First = true;
                }

                var modulTd = `<td style="text-align: center;background: #CCC"></td>`,
                    examTd = `<td style="text-align: center">${dis.ekzamen || ''}</td>`,
                    apTd = `<td style="text-align: center">${dis.ap || ''}</td>`,
                    itogTd = `<td style="text-align: center">${dis.itog}</td>`;

                if (m3) {

                    if (m3First) {
                        modulTd = `<td id="M3modul" rowspan="${m3Count}" style="text-align: center">${dis.r}</td>`;
                        examTd = `<td rowspan="${m3Count}" style="text-align: center">${dis.ekzamen || ''}</td>`;
                        apTd = `<td rowspan="${m3Count}" style="text-align: center">${dis.ap || ''}</td>`;
                        itogTd = `<td rowspan="${m3Count}" style="text-align: center">${dis.ekzamen ? dis.itog : ''}</td>`;
                    } else {
                        modulTd = '';
                        examTd = '';
                        apTd = '';
                        itogTd = '';
                    }

                }

                if (m4) {

                    if (m4First) {
                        modulTd = `<td id="M4modul" rowspan="${m4Count}" style="text-align: center">${dis.r}</td>`;
                        examTd = `<td rowspan="${m4Count}" style="text-align: center">${dis.ekzamen || ''}</td>`;
                        apTd = `<td rowspan="${m4Count}" style="text-align: center">${dis.ap || ''}</td>`;
                        itogTd = `<td rowspan="${m4Count}" style="text-align: center"><span>${dis.ekzamen ? dis.itog : ''}</span></td>`;
                    } else {
                        modulTd = '';
                        examTd = '';
                        apTd = '';
                        itogTd = '';
                    }
                }

                dis.m3Flag = m3;
                dis.m4Flag = m4;

                var r = dis.r_summer > 0 ? dis.r_summer : dis.r;

                var eumoTD = '';

                if (shablon_kontingent_id == "3" || shablon_kontingent_id == "6")
                    eumoTD = `<td><span class="eumo-link" data-rup_id="${dis.rup_id}" data-yazyk_obuch_id="${dis.id_yazyk_obuch}">ЭУМО</span></td>`;

                $('#StudentTable').append(`<tr>
						<td>${dis.disciplina_name}</td>
                        ${eumoTD}
						<td>${dis.r1} ${dis.komment1 ? `<br>Комментарий: ${dis.komment1}` : ''}</td>
						<td>${dis.r2} ${dis.komment2 ? `<br>Комментарий: ${dis.komment2}` : ''}</td>
						<td style="text-align: center">${r}</td>
						${modulTd}
                                                ${examTd}
                                                ${apTd}
                                                ${itogTd}
					</tr>`);
            }

            rebindEumo();
        });

    }

    function loadRating() {

        $('#Loader').show();

        var sem = $('#Sem').val();
        var id_group = $('#Group').val();
        var id_kontingent_kurs = $('#Group option:selected').data('id_kontngent_kurs');

        $('#StudentTable').empty();
        $("#iup_div").empty();
        $("#iup_div_f").empty();
        $("#GraficTable").empty();
        $.post('/journal/rating', {
            period_nomer: sem,
            gruppa_id: id_group,
            kontingent_kurs_id: id_kontingent_kurs
        }, function (data) {
            $('#Loader').hide();

            console.log(data);

            $('#StudentTable').append(`<tr>
                <td rowspan="2">Дисциплина</td>
                <td>2</td>
                <td>3</td>
                <td colspan="2">4</td>
                <td>5</td>
                <td>6</td>
                <td colspan="2">7</td>
                <td>8</td>
                <td colspan="1" style="text-align: center">R1</td>
            </tr>`);

            $('#StudentTable').append(`<tr>
                <td>балл</td>
                <td>балл</td>
            
                <td>балл</td>
                <td>СРС</td>
                
                <td>балл</td>
                <td>балл</td>
            
                <td>балл</td>
                <td>СРС</td>
               
                <td>балл</td>
            
                <!--<td>за 8 недель</td>
                <td>контр. срез</td>-->
                <td>общий балл</td>
            </tr>`);

            for (var dis of data) {

                var gRes = dis.ssjurnal_nedelya.split('#');
                var g = gRes[0];
                var r8w = gRes[1];
                var kr = gRes[2];
                var itog = gRes[3];

                if (r8w == 0)
                    r8w = '';

                var wRes = g.split('$');

                var row = {};

                for (var wi of wRes) {
                    if (wi == '')
                        continue;
                    var iRes = wi.split('@');

                    var w = iRes[0];
                    var b = iRes[1];
                    var srs = iRes[2];

                    if (b == 0)
                        b = '';

                    if (srs == 0)
                        srs = '';

                    row[w] = {
                        ball: b,
                        srs: srs
                    };

                }

                $('#StudentTable').append(`<tr>
                    <td>${dis.disciplina_name}</td>
                 
                    <td>${row[2].ball}</td>
                    
                    <td>${row[3].ball}</td>
            
                    <td>${row[4].ball}</td>
                    <td>${row[4].srs}</td>
                
                    <td>${row[5].ball}</td>
                
                    <td>${row[6].ball}</td>
            
                    <td>${row[7].ball}</td>
                    <td>${row[7].srs}</td>
               
                    <td>${row[8].ball}</td>
                    
                   <!-- <td style="text-align: center">${r8w}</td>
                    <td style="text-align: center">${kr}</td>-->
                    <td style="text-align: center">${itog}</td>
                </tr>`);

            }

        });

    }

    function loadRating2() {

        $('#Loader').show();

        var sem = $('#Sem').val();
        var id_group = $('#Group').val();
        var id_kontingent_kurs = $('#Group option:selected').data('id_kontngent_kurs');


        $('#StudentTable').empty();
      
        $("#iup_div").empty();
        $("#iup_div_f").empty();
        $("#GraficTable").empty();
        $.post('/journal/rating2', {
            period_nomer: sem,
            gruppa_id: id_group,
            kontingent_kurs_id: id_kontingent_kurs
        }, function (data) {
            $('#Loader').hide();

            console.log(data);

            $('#StudentTable').append(`<tr>
                <td rowspan="2">Дисциплина</td>
                <td>9</td>
                <td>10</td>
                <td colspan="2">11</td>
                <td>12</td>
                <td>13</td>
                <td colspan="2">14</td>
                <td>15</td>
                <td colspan="3" style="text-align: center">R2</td>
            </tr>`);

            $('#StudentTable').append(`<tr>
                <td>балл</td>
                <td>балл</td>
            
                <td>балл</td>
                <td>СРС</td>
                
                <td>балл</td>
                <td>балл</td>
            
                <td>балл</td>
                <td>СРС</td>
               
                <td>балл</td>
            
               <!-- <td>за 7 недель</td>
                <td>контр. срез</td>-->
                <td>общий балл</td>
            </tr>`);

            for (var dis of data) {

                var gRes = dis.ssjurnal_nedelya.split('#');
                var g = gRes[0];
                var r8w = gRes[1];
                var kr = gRes[2];
                var itog = gRes[3];

                if (r8w == 0)
                    r8w = '';

                var wRes = g.split('$');

                var row = {};

                for (var wi of wRes) {
                    if (wi == '')
                        continue;
                    var iRes = wi.split('@');

                    var w = iRes[0];
                    var b = iRes[1];
                    var srs = iRes[2];

                    if (b == 0)
                        b = '';

                    if (srs == 0)
                        srs = '';

                    row[w] = {
                        ball: b,
                        srs: srs
                    };

                }

                $('#StudentTable').append(`<tr>
                    <td>${dis.disciplina_name}</td>
                 
                    <td>${row[9].ball}</td>
                    
                    <td>${row[10].ball}</td>
            
                    <td>${row[11].ball}</td>
                    <td>${row[11].srs}</td>
                
                    <td>${row[12].ball}</td>
                
                    <td>${row[13].ball}</td>
            
                    <td>${row[14].ball}</td>
                    <td>${row[14].srs}</td>
               
                    <td>${row[15].ball}</td>
                    
                    <!--<td style="text-align: center">${r8w}</td>
                    <td style="text-align: center">${kr}</td>-->
                    <td style="text-align: center">${itog}</td>
                </tr>`);

            }

        });

    }

    function load() {

        switch (tab) {
            case TAB_CUR_CONTROL: loadCurrentWeek(); break;
            case TAB_R1: loadRating(); break;
            case TAB_R2: loadRating2(); break;
            case TAB_ITOG: loadItog(); break;
        }

    }

    function loadWeek(week) {
        var id_group = $('#Group').val();
        var id_kontingent_kurs = $('#Group option:selected').data('id_kontngent_kurs');
        var sem = $('#Sem').val();

        $('#Loader').show();

        $.post('/journal/cur-control', {
            id_group: id_group,
            id_kontingent_kurs: id_kontingent_kurs,
            nedelya_nomer: week,
            period_nomer: sem
        }, function (data) {

            $('#Loader').hide();

            console.log(data);

            if (!data)
                return;

            var firstRows = `<tr>
                <th rowspan="2">#</th>
                <th rowspan="2">Дисциплина</th>
                <th rowspan="2">ЭУМО</th>`;

            for (var vz of data.vzans)
                firstRows += `<th rowspan="2">${vz.haracter_rup_ru}</th>`;

            firstRows += '<th colspan="2">Количество пропусков</th></tr>';

            $('#StudentTable').empty();
            $("#iup_div").empty();
            $("#iup_div_f").empty();
            $("#GraficTable").empty();
            $('#StudentTable').append(firstRows);
            $('#StudentTable').append(`<tr><th>за неделю</th><th>всего</th></tr>`);

            var n = 0;
            for (var dis of data.discips) {
                //dis.disciplina_kod = '200';

                n++;
                var disRow = `<tr style="${dis.disciplina_kod == '777' ? 'background: #F99' : ''}">
                    <td rowspan="2">${n}</td>
                    <td rowspan="2"><!--(${dis.rup_id1}) [${dis.ssharacter_rup_student_id}]--> ${dis.disciplina_name} ${dis.disciplina_kod == '777' ? '- ЛЕТНИЙ СЕМЕСТР' : ''}</td>
                    <td rowspan="2"><span class="eumo-link" data-rup_id="${dis.rup_id1}" data-yazyk_obuch_id="${dis.id_yazyk_obuch}">ЭУМО</span></td>`;

                for (var vz of data.vzans) {
                    var save = data.saves.find(sv => sv.haracter_rup_id == vz.haracter_rup_id && sv.rup_id2 == dis.rup_id1);
                    //console.log('save: ', save);
                    var isMissed = save && save.ssjurnal_poseshaemost_status != '0' && save.ssjurnal_poseshaemost_status != '';
                    disRow += `<td style="text-align: center; border-bottom: none" data-sotrudnik_id="${save ? save.sotrudnik_id : 0}" class="emp-link ${isMissed ? 'alert-cell' : ''} ${!save ? 'empty-cell' : ''}" >${save ? save.sotrudnik_fio : ""}</td>`;
                }

                disRow += `<td rowspan="2">${dis.ssjurnal_poseshaemost_nedeleya_sum}</td><td rowspan="2">${dis.ssjurnal_poseshaemost_all_sum}</td></tr>`;

                $('#StudentTable').append(disRow);

                var secondRow = '<tr>';

                for (var vz of data.vzans) {

                    var save = data.saves.find(sv => sv.haracter_rup_id == vz.haracter_rup_id && sv.rup_id2 == dis.rup_id1);
                    var isMissed = save && save.ssjurnal_poseshaemost_status != '0' && save.ssjurnal_poseshaemost_status != '';
                    var val = !save ? '' : (isMissed ? `н/б` : save.ssjurnal_ball);

                    var uploadZadanieHtml = ``;
                    if (save /*&& val == ''*/) {

                        if (save.link) {
                            //uploadZadanieHtml = `<a href="http://prepod.zhgu.edu.kz:8056/messenger/download?${save.link}">Скачать</a>
                            //                    <button class="btn-del-zadanie" data-ssharacter_rup_sotrudnik_id="${save.ssharacter_rup_sotrudnik_id}" data-haracter_rup_id="${vz.haracter_rup_id}">Удалить</button>`;
                            //uploadZadanieHtml = '<span style="color: green">Задание загружено</span> ';
                        } else {
                            /*if(SETTINGS.ssjurnal_nastr_block_zadanie == 0)*/
                            //uploadZadanieHtml = `<button class="btn-upload-zadanie" data-ssharacter_rup_sotrudnik_id="${save.ssharacter_rup_sotrudnik_id}" data-haracter_rup_id="${vz.haracter_rup_id}">Загрузить задание</button>`;
                        }
                    }

                    secondRow += `<td style="text-align: center; border-top: none;" class="${isMissed ? 'alert-cell' : ''} ${!save ? 'empty-cell' : ''}">${uploadZadanieHtml}${val ? ', Балл: <span style="color: green">' + val + '</span> <br> Комментарий: ' + (save.ssjurnal_komment ? save.ssjurnal_komment : '') : ''}</td>`;
                }


                secondRow += `</tr>`;

                $('#StudentTable').append(secondRow);

            }

            rebindEmpDialog();
            rebindEumo();

            var totalWeek = data.discips.reduce(function (sum, n) {
                return sum + n.ssjurnal_poseshaemost_nedeleya_sum;
            }, 0);

            var total = data.discips.reduce(function (sum, n) {
                return sum + n.ssjurnal_poseshaemost_all_sum;
            }, 0);

            if (total >= MAX_PROPUSK)
                myAlert("У вас критическое количество пропусков!")

            $('#StudentTable').append(`<tr><td colspan="${2 + data.vzans.length}" style="text-align: right">Итого:</td><td>${totalWeek}</td><td class="${total >= MAX_PROPUSK ? 'alert-cell' : ''}">${total}</td></tr>`);
        });
    }

    function rebindEumo() {

        $('.eumo-link').unbind().click(function () {

            $('#EumoDialog').show();

            var id_rup = $(this).data('rup_id');
            var id_yazyk_obuch = $(this).data('yazyk_obuch_id');
            var id_gruppa = $('#Group').val();
            var id_kontingent_kurs = $('#Group option:selected').data('id_kontngent_kurs');
            var shablon_kontingent_id = $('#Group option:selected').data('shablon_kontingent_id');
            $('#TblFiles tr:gt(0)').remove();
            $('#Loader').show();
            $.post('/eumo/files',
                {
                    id_rup: id_rup,
                    id_yazyk_obuch: id_yazyk_obuch,
                    id_gruppa: id_gruppa,
                    id_kontingent_kurs: id_kontingent_kurs
                },
                function (rows) {

                    console.log("EUMO rows: ", rows);

                    var i = 0;

                    var oldNedelyaNomer = -1;

                    for (var file of rows) {
                        i++;

                        var link = file.link.substring(0, 4) == 'http' ? file.link : `https://prepod.zhetysu.edu.kz:3008/uploads/${file.link}`;

                        var nedelyaHtml = '';

                        if (oldNedelyaNomer != file.nedelya_nomer) {
                            var count = rows.filter(f => f.nedelya_nomer == file.nedelya_nomer).length;
                            nedelyaHtml = `<td style="text-align: center" rowspan="${count}">${file.nedelya_nomer == 0 ? '' : file.nedelya_nomer} ${file.nedelya_nomer == 29 ? '(Для не работающих по спец...)' : `${file.nedelya_nomer == 30 ? '(Для работающих по спец...)' : ''}`}</td>`;
                            oldNedelyaNomer = file.nedelya_nomer;
                        }

                        var fileHTML = '';

                        if (file.zagruzhennyi_file == "")

                            if (!(shablon_kontingent_id == '3' || shablon_kontingent_id == '6') && (file.shablon_plan_zanyatii_status === 2))

                                fileHTML = `
                                <button 
                                    data-shablon_plan_zanyatii_disciplina_id="${file.shablon_plan_zanyatii_disciplina_id}"
                                    data-rup_id="${id_rup}"
                                    class="btn-upload-zad">
                                        Загрузить задание
                                </button>`;

                            else if ((shablon_kontingent_id === 3 || shablon_kontingent_id === 6) && (file.id_shablon_plan_zanyatii === '98' || file.id_shablon_plan_zanyatii === '99') && (file.shablon_plan_zanyatii_tip == 0))
                                fileHTML = `
                                  
                                    <button 
                                    data-shablon_plan_zanyatii_disciplina_id="${file.shablon_plan_zanyatii_disciplina_id}"
                                    data-rup_id="${id_rup}" id="id_shablon_plan_zanyatii${file.id_shablon_plan_zanyatii}"
                                    class="btn-upload-zad">
                                        Загрузить задание
                                </button>`;

                            else if ((shablon_kontingent_id === 3 || shablon_kontingent_id === 6) && (file.shablon_plan_zanyatii_status === 2) && (file.shablon_plan_zanyatii_tip == 1))
                                fileHTML = `
                                    <button 
                                    data-shablon_plan_zanyatii_disciplina_id="${file.shablon_plan_zanyatii_disciplina_id}"
                                    data-rup_id="${id_rup}" 
                                    class="btn-upload-zad praktika${file.shablon_plan_zanyatii_tip}"">
                                        Загрузить задание
                                </button>`;
                            else
                                fileHTML = `
                                <button 
                                   style="display:none;"
                                    data-shablon_plan_zanyatii_disciplina_id="${file.shablon_plan_zanyatii_disciplina_id}"
                                    data-rup_id="${id_rup}"
                                    class="btn-upload-zad">
                                        Загрузить задание
                                </button>`;

                        else
                            fileHTML = `<span style="color: #1ea51e">Файл загружен
                            <a target="_blank" href="${file.zagruzhennyi_file}"><button>Скачать</button></a></span> 
                            ${file.id_shablon_plan_zanyatii == 98 ? `<button class="delete_file rk_del1" id="${file.shablon_plan_zanyatii_disciplina_student_id}" fileurl="${file.zagruzhennyi_file}">Удалить</button>` : ''}
                            ${file.id_shablon_plan_zanyatii == 99 ? `<button class="delete_file rk_del2" id="${file.shablon_plan_zanyatii_disciplina_student_id}" fileurl="${file.zagruzhennyi_file}">Удалить</button>` : ''}
							${file.shablon_plan_zanyatii_tip == 1 ? `<button class="delete_file pr_del" id="${file.shablon_plan_zanyatii_disciplina_student_id}" fileurl="${file.zagruzhennyi_file}">Удалить</button>` : ''}

                            `;

                        $('#TblFiles').append(`<tr style="${file.id_shablon_plan_zanyatii == 104 ? 'background-color: antiquewhite;' : `${file.id_shablon_plan_zanyatii == 98 ? 'background-color: antiquewhite;' : `${file.id_shablon_plan_zanyatii == 99 ? 'background-color: antiquewhite;' : `${file.id_shablon_plan_zanyatii == 103 ? 'background-color: antiquewhite;' : ''}`}`}`}">
                        <!--<td>${i}</td>-->
                        <!--<td>${file.id_shablon_plan_zanyatii}</td>-->
                        ${nedelyaHtml}
                        <td>${file.sotrudnik_fio}</td>

                        ${file.id_metka == 20302 ? `<td><a>${file.name}</a></td>` : `<td><a target="_blank" href="${link}">${file.name}</a></td>`}

                        

                        <td>${fileHTML}</td>
                    </tr>`);
                    }
                    $('#Loader').hide();

                    $.post('/eumo/check_grafic',
                        {
                            id_gruppa: id_gruppa,
                            id_kontingent_kurs: id_kontingent_kurs,
                            id_rup: id_rup
                        },
                        function (rows) {
                            //console.log("flag:", rows)
                            var rk1 = $('#id_shablon_plan_zanyatii98');
                            var rk2 = $('#id_shablon_plan_zanyatii99');
                            var pr_del = $('.pr_del');
                            var rk_del1 = $('.rk_del1');
                            var rk_del2 = $('.rk_del2');
                            var praktika = $(".praktika1")

                            if (rows.flag == 0) {
                                rk1.removeAttr();
                                rk1.html('Срок на сдачу истек!')
                                rk_del1.remove();
                                rk1.prop("disabled", true);

                            }
                            if (rows.flag2 == 0) {
                                rk2.removeAttr();
                                rk2.html('Срок на сдачу истек!')
                                rk_del2.remove();
                                rk2.prop("disabled", true);

                            }
                            if (rows.flag_praktika == 0) {
                                praktika.removeAttr();
                                praktika.html('Срок на сдачу истек!')
                                pr_del.remove();
                                praktika.prop("disabled", true);
                            }
                        })

                    rebindUploadButtons();
                });
        });

    }


    function rebindUploadButtons() {

        $('.btn-upload-zad').unbind().click(function () {

            var rup_id = $(this).data('rup_id');
            var shablon_plan_zanyatii_disciplina_id = $(this).data('shablon_plan_zanyatii_disciplina_id');
            var gruppa_id = $('#Group').val();
            var kontingent_kurs_id = $('#Group option:selected').data('id_kontngent_kurs');

            $('#UploadForm').get(0).reset();

            $('#UploadFile').click();

            var btn = this;

            $('#UploadFile').unbind().change(function () {

                if ($(this)[0].files.length < 1) return;

                var formData = new FormData($('#UploadForm')[0]);
                formData.append("rup_id", rup_id);
                formData.append("shablon_plan_zanyatii_disciplina_id", shablon_plan_zanyatii_disciplina_id);
                formData.append("gruppa_id", gruppa_id);
                formData.append("kontingent_kurs_id", kontingent_kurs_id);

                $('#Loader').show();

                $.ajax({
                    url: '/upload_zadanie',
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    method: 'POST',
                    type: 'POST', // For jQuery < 1.9
                    success: (data) => {

                        $('#Loader').hide();

                        if (data)
                            $(btn).parent().html(`<span style="color: #00FF00">Файл загружен <a target="_blank" href="${data}"><button>Скачать</button></a></span>
                            
                            `);
                    }
                });

            });
        });

        /*
        $('.btn-del-zadanie').unbind().click(function(){

            var id_ssharacter_rup_sotrudnik = $(this).data("ssharacter_rup_sotrudnik_id");
            var id_haracter_rup = $(this).data("haracter_rup_id");

            $.post(
                "/journal/del-zadanie",
                {
                    id_ssharacter_rup_sotrudnik: id_ssharacter_rup_sotrudnik,
                    id_haracter_rup: id_haracter_rup,
                    nedelya_nomer: curWeek
                },
                function(res) {
                    if (res != "ok") alert("Произошла ошибка при сохранении");

                    location.reload();
                }
            );
        });
        */
    }

    function loadCurrentWeek() {
        var curWeek = $('#CurWeek').text();
        loadWeek(curWeek);
    }

    $('body').on('click', '.delete_file', function () {
        var btn = $(this);
        var shablon_plan_zanyatii_disciplina_student_id = $(this).attr("id");
        var fileurl = $(this).attr("fileurl");
        $(this).prop('disabled', true);
        $('#Loader').show();
        $.post('/delstudurl', {
            shablon_plan_zanyatii_disciplina_student_id: shablon_plan_zanyatii_disciplina_student_id,
            fileurl: fileurl
        }, function (data) {
            console.log(data)
            if (data == 'success') {
                btn.html("Файл удален!");
            } else {
                alert('Ошибка!')
            }

        });
        $('#Loader').hide();
        return false;
    });

    $(document).ready(function () {
        var shablon_kontingent_id = $('#Group option:selected').data('shablon_kontingent_id');
        var kontingent_kurs_id = $('#Group option:selected').data('id_kontngent_kurs');
        if (shablon_kontingent_id == '3' || shablon_kontingent_id == '6') {
            $('.notice').hide();
            $.post('/news/get_rk_data', {
                kontingent_kurs_id: kontingent_kurs_id
            }, function (data) {
                console.log(data)
                if (!!data) {
                    $('.notice-dot').append(`
                        Дата сдачи рубежного контроля №1: до-${data[0].rk1_data}<br>
                        Дата сдачи рубежного контроля №2: до-${data[0].rk2_data}
                    `)
                    $('.notice-dot').show();
                } else {
                    $('.notice-dot').hide();
                }

            });

        } else {

        }

    });

    var removeAttr = jQuery.fn.removeAttr;
    jQuery.fn.removeAttr = function () {

        if (!arguments.length) {
            this.each(function () {

                // Looping attributes array in reverse direction
                // to avoid skipping items due to the changing length
                // when removing them on every iteration.
                for (var i = this.attributes.length - 1; i >= 0; i--) {
                    jQuery(this).removeAttr(this.attributes[i].name);
                }
            });

            return this;
        }

        return removeAttr.apply(this, arguments);
    };


});
