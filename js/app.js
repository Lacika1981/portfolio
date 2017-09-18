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

/* https://www.sitepoint.com/scroll-based-animations-jquery-css3/ */

$(function(){
    var $animatedElement = $('li.animated');
    var $window = $(window);

    $window.on('scroll resize', checkInView);
    $window.trigger('scroll');

    function checkInView() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);
      
        $.each($animatedElement, function() {
          var $element = $(this);
          var element_height = $element.outerHeight();
          var element_top_position = $element.offset().top;
          var element_bottom_position = (element_top_position + element_height);
      
          //check to see if this current container is within viewport
          if ((element_bottom_position >= window_top_position) &&
              (element_top_position <= window_bottom_position)) {
            if ($element.hasClass('timeline-inverted')){
                $(this).addClass('slideInRight')
            }
            if ($element.hasClass('timeline')){
                $(this).addClass('slideInLeft')
            }
          }
        });
      }
})
