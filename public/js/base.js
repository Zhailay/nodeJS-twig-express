$('.sub-btn').click(function () {
    $(this).next('.sub-menu').slideToggle();
    $(this).find('.dropdown').toggleClass('rotate');
});



$(window).on('load', function() {
    var current = location.pathname;
    // console.log(current);
    $('#nav-item li a').each(function () {
        var $this = $(this);
        var href = $this.attr('href');
        
        if (href === current) {
            $this.addClass('active');
            $this.closest('ul').css('display', 'block');
            $this.closest('svg').addClass('rotate')
        }
    });
});