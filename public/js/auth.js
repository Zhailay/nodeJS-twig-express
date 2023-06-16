$("body").on("click", "#signin", function (e) {
    const login = $("#userlogin").val();
    const password = $("#userpassword").val();

    if (!login || !password) {
        Swal.fire('Логин и пароль не может быть пустым!');
        return;
    }

    $.ajax({
        url: '/auth',
        type: 'POST',
        data: {
            login: login,
            password: password
        },
        success: function (data, textStatus, jqXHR) {
            if (jqXHR.status === 200) {
                console.log("Status code:", jqXHR.status);
                console.log("Response data:", data);
                Swal.fire({
                    icon: 'success',
                    title: 'Успешно',
                    text: `${jqXHR.responseJSON.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                    didClose: () => {
                        window.location.href = '/dashboard';
                    }
                });
            }
        },
        error: function (jqXHR, textStatus) {
            Swal.fire(
                `Ошибка!`,
                `${jqXHR.responseJSON.message}`,
                'error'
            );
        }
    });
});