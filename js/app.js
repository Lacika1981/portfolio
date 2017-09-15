/* $(function(){
    let widthArray = [];
    let $width = $('.progress-bar').each(function(){
        widthArray.push($(this).css('width'));
    })
    widthArray.forEach(function(widths){
        console.log(widthArray);
    })
$('.progress-bar').each(function(){
    for(let i = 0; i < widthArray.length; i++){
    $(this).css('width', widthArray[i]);
    }
});
}) */
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