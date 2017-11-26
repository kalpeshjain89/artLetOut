"use strict";
$(document).ready(function () {
    addToHomescreen(); /* Initialize Add to Home Screen script */
    
    setTimeout(function () {
        setSliderHeight();        
    }, 300);

    var slideCounter = 0;
    var bannerCarousel = setInterval(function () {
        slideCounter++;
        slideLeft();
        if (slideCounter > 8) {
            slideCounter = 0;
            slideLeft(slideCounter);
        }
    }, 5000);
    
    $("#stopCarousel").on("click", function(){
        clearInterval(bannerCarousel);
    });

    $(".bubbles li a").on("click", function (event) {
        event.stopPropagation();
        $(this).parent().addClass("active").siblings().removeClass("active");
        if (slideCounter === $(this).parent().index()) {
            return false;
        }
        else if (slideCounter > $(this).parent().index()) {
            slideCounter = $(this).parent().index();
            slideRight();
        }
        else if (slideCounter < $(this).parent().index()) {
            slideCounter = $(this).parent().index();
            slideLeft();
        }
    });

    function slideLeft() {
        if (slideCounter <= 8) {
            $(".imgSlider > a").eq(slideCounter).addClass("active")
                    .attr({
                        "aria-hidden":false,
                        "href":"javascript:;"
                    })                    
                    .siblings().removeClass("active")
                    .attr("aria-hidden",true)
                    .removeAttr("href");     
                    setTimeout(function(){
                        var imgSrc = $(".imgSlider > a").eq(slideCounter).find("img").attr("data-src");
                        $(".imgSlider > a").eq(slideCounter).find("img").attr("src",imgSrc);
                    }, 0);
            $(".bubbles li").eq(slideCounter).addClass("active").siblings().removeClass("active");
        }
    };

    function slideRight() {
        if (slideCounter >= 0) {
            $(".imgSlider > a").eq(slideCounter).addClass("active")
            .attr({
                "aria-hidden":false,
                "href":"javascript:;"
            })
            .siblings().removeClass("active")
            .attr("aria-hidden",true)
            .removeAttr("href");
    
            setTimeout(function(){
                var imgSrc = $(".imgSlider > a").eq(slideCounter).find("img").attr("data-src");
                $(".imgSlider > a").eq(slideCounter).find("img").attr("src",imgSrc);
            }, 0);
            $(".bubbles li").eq(slideCounter).addClass("active").siblings().removeClass("active");
        }
    };
});

$(window).on("resize", function () {
    setSliderHeight();
});

function setSliderHeight() {
    $(".imgSlider").height($(".imgSlider img").height());
}