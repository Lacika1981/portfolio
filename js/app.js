const animatedProgressBar = function (){
    $(".progress div").each(function () {
        let display = $(this),
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


const animatedDives = function (){
    let $animatedElement = $('li.animated');
    let $window = $(window);

    $window.on('scroll resize', checkInView);
    $window.trigger('scroll');

    function checkInView() {
        let window_height = $window.height();
        let window_top_position = $window.scrollTop();
        let window_bottom_position = (window_top_position + window_height);

        $.each($animatedElement, function () {
            let $element = $(this);
            let element_height = $element.outerHeight();
            let element_top_position = $element.offset().top;
            let element_bottom_position = (element_top_position + element_height);

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

const portfolioCall = function(data) {
    $.ajax({
        url: 'js/portfolio.json',
        dataType: 'json'
    })
        .done(function (response) {
            let objectPortfolio = response;
            let keys = Object.keys(objectPortfolio);
            for (let i = 0; i < keys.length; i++) {
                objectPortfolio[keys[i]].githubImage = "../images/mark-github.svg";
                objectPortfolio[keys[i]].linkInsideImage = "../images/kebab-horizontal.svg";
            }

            let responseTitle = '<h5 class="modal-title" id="exampleModalLongTitle">%data%</h5>'.replace("%data%", response[data].title);
            let responseBody = '<p class="card-text">%data%</p>'.replace("%data%", response[data].body);
            let responseImage = '<img class="img-fluid" src="%data%">'.replace("%data%", response[data].image);
            let responseLink = response[data].linkGitHub;
            let responseGitHub = '<a href="' + responseLink + '" target="_blank"><img class="img-fluid" src="%data%"></a>'.replace("%data%", response[data].githubImage);
            let responseLinkInside = response[data].linkInsidePage;
            let responseLinkInsideImage = '<a href="' + responseLinkInside + '" target="_blank"><img class="img-fluid" src="%data%"></a>'.replace("%data%", response[data].linkInsideImage);
            $('.modal-header').empty().append(responseTitle);
            $('.modal-body').empty().append(responseBody).append(responseImage);
            $('.gitHubIcon').empty().append(responseGitHub);
            $('.insideIcon').empty().append(responseLinkInsideImage);
        });
}

const shortenCardText = function(){
    $('p.card-text').each(function(){ // take card text
        let text = $(this)[0].innerText; // take value of card text
        let textLength = text.length; // length of the text
        let maxLength = 40; // max length

        if (textLength > maxLength) { // checking max length
            let a = text.charAt(maxLength); // what character at that position
            if (a != ' '){ // check if it is a space
                let space = text.indexOf(' ', maxLength); // check for space from the position of maxLength
                let b = text.slice(0, space); // slice the text
                $(this).empty().append(b + ' ...'); // empty the container and append the text
            }
        }
    });
}

$('body').scrollspy({ target: '#navbar-example' });

$(document).on('click', 'button', function (elem) {
    let clickedElem = elem.target;
    let clickedAttribute = clickedElem.getAttribute('data-jsonTarget');
    portfolioCall(clickedAttribute);
});

$(function(){
    animatedDives();
    animatedProgressBar();
    shortenCardText();
});

$(function(){
    $('.menu img').click(function(){
        $(this).toggleClass('menuToggle');
        $('.navbar').toggleClass('navbarToggle');
    });
});

$(function(){
    let windowWidth = $(window).width();
    if (windowWidth <= 800){
        $('.timeline, .timeline-inverted').removeClass('animated');
    }
});