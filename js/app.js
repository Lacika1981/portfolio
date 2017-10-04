var animatedProgressBar = function (){
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
}

/* https://www.sitepoint.com/scroll-based-animations-jquery-css3/ */


var animatedDives = function (){
    var $animatedElement = $('li.animated');
    var $window = $(window);

    $window.on('scroll resize', checkInView);
    $window.trigger('scroll');

    function checkInView() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animatedElement, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                if ($element.hasClass('timeline-inverted')) {
                    $(this).addClass('slideInRight');
                }
                if ($element.hasClass('timeline')) {
                    $(this).addClass('slideInLeft');
                }
            }
        });
    }
}

var portfolioCall = function(data) {
    $.ajax({
        url: 'js/portfolio.json',
        dataType: 'json'
    })
        .done(function (response) {
            var objectPortfolio = response;
            var keys = Object.keys(objectPortfolio);
            for (var i = 0; i < keys.length; i++) {
                objectPortfolio[keys[i]].githubImage = "../images/mark-github.svg";
            }

            var responseTitle = '<h5 class="modal-title" id="exampleModalLongTitle">%data%</h5>'.replace("%data%", response[data].title);
            var responseBody = '<p class="card-text">%data%</p>'.replace("%data%", response[data].body);
            var responseImage = '<img class="img-fluid" src="%data%">'.replace("%data%", response[data].image);
            var responseLink = response[data].linkGitHub;
            var responseGitHub = '<a href="' + responseLink + '" target="_blank"><img class="img-fluid" src="%data%"></a>'.replace("%data%", response[data].githubImage);
            $('.modal-header').empty().append(responseTitle);
            $('.modal-body').empty().append(responseBody).append(responseImage);
            $('.gitHubIcon').empty().append(responseGitHub);
        });
}

var shortenCardText = function(){
    $('p.card-text').each(function(){ // take card text
        var text = $(this)[0].innerText; // take value of card text
        var textLength = text.length; // length of the text
        var maxLength = 40; // max length

        if (textLength > maxLength) { // checking max length
            var a = text.charAt(maxLength); // what character at that position
            if (a != ' '){ // check if it is a space
                var space = text.indexOf(' ', maxLength); // check for space from the position of maxLength
                var b = text.slice(0, space); // slice the text
                $(this).empty().append(b + ' ...'); // empty the container and append the text
            }
        }
    });
}

$('body').scrollspy({ target: '#navbar-example' });

$(document).on('click', 'button.modalCall', function (elem) {
    var clickedElem = elem.target;
    var clickedAttribute = clickedElem.getAttribute('data-jsonTarget');
    portfolioCall(clickedAttribute);
});

$(function(){
    $('.menu img').click(function(){
        $(this).toggleClass('menuToggle');
        $('.navbar').toggleClass('navbarToggle');
    });
});

$(function(){
    var windowWidth = $(window).width();
    if (windowWidth <= 800){
        $('.timeline, .timeline-inverted').removeClass('animated');
    }
});

$(function(){
    // Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});
})

$(function(){
    animatedDives();
    animatedProgressBar();
    shortenCardText();
});