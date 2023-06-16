$('.journal-tab').click(function () {
    $('.journal-active-tab').removeClass('journal-active-tab');
    $(this).addClass('journal-active-tab');
});

$(window).on("load", function () {
    var element = $("#1");
    element.click();
})

$(".journal-tab").click(function (e) {
    $("#Loader").show();
    var id_post = $(this).attr("id");
	var btn = $(this);
    $(".journal-tab").prop('disabled', false);
    btn.prop('disabled', true);
	
    $.post('/putevoditel/news', {
        id_post: id_post
    }, function (data) {
        var my_dialog = $("#news_list");
        my_dialog.empty()
        $.each(data, function (i, order) {
            my_dialog.append(`
            <div class="w-full max-w-full px-3 mb-6 mt-6 sm:w-4/12 md:w-3/12 md:flex-none xl:mb-0 xl:w-3/12 ">
                <div
                    class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none dark:shadow-dark-xl rounded-2xl bg-clip-border">
                    <div class="relative">
                        <a class="block shadow-xl rounded-2xl">
                            <img src="https://student.zhetysu.edu.kz:8059/${data[i].post_news_photo}" alt="${data[i].post_news_title}"
                                class="max-w-full shadow-2xl rounded-2xl">
                        </a>
                    </div>
                    <div class="flex-auto px-1 pt-6">
                        <p
                            class="relative z-10 mb-2 text-lg leading-normal text-transparent bg-gradient-to-tl from-zinc-800 to-zinc-700 bg-clip-text dark:text-white dark:opacity-80">
                            Дата публикаций: ${data[i].post_news_data} </p>
                        <a href="javascript:;">
                            <h5 class="dark:text-white">${data[i].post_news_title}</h5>
                        </a>                    
                        <div class="flex items-center justify-between">
                            <a href="/putevoditel/news/${data[i].post_news_id}"
                                class="inline-block px-8 py-2 mb-0 text-xs font-bold leading-normal text-center text-blue-500 align-middle transition-all ease-in bg-transparent border border-blue-500 border-solid rounded-lg shadow-none cursor-pointer hover:-translate-y-px active:shadow-xs tracking-tight-rem hover:border-blue-500 hover:bg-transparent hover:text-blue-500 hover:opacity-75 hover:shadow-none active:bg-blue-500 active:text-white active:hover:bg-transparent active:hover:text-blue-500">Читать</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full max-w-full px-3 mb-6 mt-6 sm:w-4/12 md:w-3/12 md:flex-none xl:mb-0 xl:w-3/12 ">
            <div
                class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div class="relative">
                    <a class="block shadow-xl rounded-2xl">
                        <img src="https://student.zhetysu.edu.kz:8059/${data[i].post_news_photo}" alt="${data[i].post_news_title}"
                            class="max-w-full shadow-2xl rounded-2xl">
                    </a>
                </div>
                <div class="flex-auto px-1 pt-6">
                    <p
                        class="relative z-10 mb-2 text-lg leading-normal text-transparent bg-gradient-to-tl from-zinc-800 to-zinc-700 bg-clip-text dark:text-white dark:opacity-80">
                        Дата публикаций: ${data[i].post_news_data} </p>
                    <a href="javascript:;">
                        <h5 class="dark:text-white">${data[i].post_news_title}</h5>
                    </a>                    
                    <div class="flex items-center justify-between">
                        <a href="/putevoditel/news/${data[i].post_news_id}"
                            class="inline-block px-8 py-2 mb-0 text-xs font-bold leading-normal text-center text-blue-500 align-middle transition-all ease-in bg-transparent border border-blue-500 border-solid rounded-lg shadow-none cursor-pointer hover:-translate-y-px active:shadow-xs tracking-tight-rem hover:border-blue-500 hover:bg-transparent hover:text-blue-500 hover:opacity-75 hover:shadow-none active:bg-blue-500 active:text-white active:hover:bg-transparent active:hover:text-blue-500">Читать</a>
                    </div>
                </div>
            </div>
        </div>
            `);
            // <p class="mb-6 text-sm leading-normal dark:text-white dark:opacity-60">Описание поста</p> 
        });
        $("#Loader").hide();
    })
});