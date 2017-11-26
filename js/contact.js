"use strict";
$(document).ready(function () {   
    loadMap(); /* load the Map */ 
    
    if (localStorage.getItem("message") !== null) {        
        $("#messageId").val(localStorage.getItem("message"));
        $('html, body').animate({
            scrollTop: $(".contactUs").offset().top - 80
        }, 1200, function(){
            localStorage.removeItem("message");/* Clear the message */
        });        
    }

    $("input, textarea").on("keyup", function () {
        var fieldValue = $(this).val();
        if (fieldValue) {
            $(this).parents(".floating-container").find(".floating-label").fadeIn(400);
        }
        else {
            $(this).parents(".floating-container").find(".floating-label").fadeOut(400);
        }
    });
    
    $("#submitBtn").on("click", function (e) {
        if (!validateName() && !validatePhoneNumber() && !validateEmail() && !validateMessage()) {
            $('html, body').animate({
                scrollTop: $(".errorControl:first:visible").offset().top - 100
            }, 900, function(){
                setTimeout(function(){
                    $(".errorControl:first:visible").click().focus();                    
                },0);
            });        
            return false;            
        }
        else if (!validateName() || !validatePhoneNumber() || !validateEmail() || !validateMessage()) {            
            $('html, body').animate({
                scrollTop: $(".errorControl:first:visible").offset().top - 100
            }, 900, function(){
                setTimeout(function(){
                    $(".errorControl:first:visible").click().focus();                    
                },0);
            });
            return false;
        }
        else {
            showPopup(); /* Show the Pop Up */
            return true;
        }
    });
});

function loadMap() {
    var myLatlng = new google.maps.LatLng(18.971963, 72.8378428);
    var mapOptions = {
        center: new google.maps.LatLng(18.971963, 72.8378428),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.BOUNCE,
        title: 'Dinesh Industries'
    });
};

function validateName() {
    var name = $("#nameId");
    var nameRegex = /^[a-zA-Z ][ a-zA-Z ]*$/;
    if (name.val() === "") {
        $("#nameErrorId").show().html("Please enter your Name");
        name.addClass("errorControl");
        return false;
    }
    else if (name.val().length < 3 || !nameRegex.test(name.val())) {
        $("#nameErrorId").show().html("Please enter valid Name");
        name.addClass("errorControl");
        return false;
    }
    else {
        $("#nameErrorId").html("").hide();
        name.removeClass("errorControl");
        return true;
    }
}

function validatePhoneNumber() {
    var mobileNumber = $("#mobileNumber");
    var phoneNumberRegex = /^[0-9]{10}$/;
    if (mobileNumber.val() === "") {
        $("#mobileNumberId").show().html("Please enter your Mobile Number");
        mobileNumber.addClass("errorControl");
        return false;
    }
    else if (mobileNumber.val().length < 10 || !phoneNumberRegex.test(mobileNumber.val())) {
        $("#mobileNumberId").show().html("Please enter valid Mobile Number");
        mobileNumber.addClass("errorControl");
        return false;
    }
    else {
        $("#mobileNumberId").html("").hide();
        mobileNumber.removeClass("errorControl");
        return true;
    }
}

function validateEmail() {
    var email = $("#emailId");
    var emailRegex = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
    if (email.val() === "") {
        $("#emailErrorId").show().html("Please enter your Email ID");
        email.addClass("errorControl");
        return false;
    }
    else if (!emailRegex.test(email.val())) {
        $("#emailErrorId").show().html("Please enter valid Email ID");
        email.addClass("errorControl");
        return false;
    }
    else {
        $("#emailErrorId").html("").hide();
        email.removeClass("errorControl");
        return true;
    }
}

function validateMessage() {
    var message = $("#messageId");
    if (message.val() === "") {
        $("#messageErrorId").show().html("Please enter your Feedback");
        message.addClass("errorControl");
        return false;
    }
    else {
        $("#messageErrorId").html("").hide();
        message.removeClass("errorControl");
        return true;
    }
}

function showPopup() {
    $('.modal, .loader').fadeIn('400');
    $('body,html').css('overflow', 'hidden');
}