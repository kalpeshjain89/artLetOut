"use strict";
$(document).ready(function () {
    $("#currentYear").text(new Date().getFullYear()); /* Set current year for copyright */

    $("header .traylist").on("click", function (event) {
        $("header nav").slideToggle(400);
        event.stopPropagation(); /* Prevent event bubbling */
    });

    $(document).on("click", function (event) {
        if (window.innerWidth < 768) {
            event.stopPropagation(); /* Prevent event bubbling */
            $("header nav").slideUp(800);
        }
    });

    $(window).resize(function () {
        if (window.innerWidth > 768) {
            $("header nav").removeAttr("style");
        }
    });

    $(document).scroll(function () {
        var $scrollTop = $(this).scrollTop();
        if ($scrollTop > 0) {
            $("header").addClass("shrink");
        }
        else
            $("header").removeClass("shrink");
    });

    $("#productsNav a, #siteMapNav a, .products a, .imgSlider a:not(.bubbles a), .customMarquee a").on("click", function () {
        localStorage.setItem("productGroup", $(this).attr("data-target"));
        if ($(this).attr("data-target") === "products")
            location.href = "products.html";
        else
            location.href = "products.html#" + $(this).attr("data-target");
    });
});

/* Accordion function starts here */
function customAccordion(element, collapseAll) {
    if (collapseAll) {
        element.parent().toggleClass("expand").siblings().removeClass("expand");
        element.parent().siblings().children("dd").slideUp(600, function () {
            $(this).siblings("dt").find("a").attr("aria-expanded", false);
            $(this).attr({
                "aria-expanded": false,
                "aria-hidden": true
            });
        });
        if (element.parent().hasClass("expand")) {
            element.siblings("dd").slideDown(600, function () {
                element.find("a").attr("aria-expanded", true);
                $(this).attr({
                    "aria-expanded": true,
                    "aria-hidden": false
                });
            });
        }
        else {
            element.siblings("dd").slideUp(600, function () {
                element.find("a").attr("aria-expanded", false);
                $(this).attr({
                    "aria-expanded": false,
                    "aria-hidden": true
                });
            });
        }
    }
    else {
        element.parent().toggleClass("expand");
        if (element.parent().hasClass("expand")) {
            element.siblings("dd").slideDown(600, function () {
                element.find("a").attr("aria-expanded", true);
                $(this).attr({
                    "aria-expanded": true,
                    "aria-hidden": false
                });
            });
        }
        else {
            element.siblings("dd").slideUp(600, function () {
                element.find("a").attr("aria-expanded", false);
                $(this).attr({
                    "aria-expanded": false,
                    "aria-hidden": true
                });
            });
        }
    }
}