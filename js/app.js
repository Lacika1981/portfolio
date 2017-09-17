$(function () {
    $(".progress div").each(function () {
        var display = $(this),
            nextValue = $(this).attr("aria-valuenow");
        $(display)
            .animate({
                "width": nextValue + "%"
            }, {
                duration: 250,
                width: 'easing'
            });
    });
})

$('body').scrollspy({ target: '#navbar-example' })

var test = function(){
    console.log('hello');
}