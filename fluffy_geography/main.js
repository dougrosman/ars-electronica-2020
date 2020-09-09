$(document).ready(function(){
    
    let ready = true;
    let s = 1;

    $('.fa-angle-down').on('click', function(){
        if(ready){ready=false; showRsvp(); }
    })

    
    $(window).on('wheel', function(){
        if(ready){ready=false; showRsvp(); }
    })

    function showRsvp() {
        $('.rsvp').delay(4000*s).show().animate({
            opacity: 1
        }, 1000);
    }

    $('.close').on('click', function(){
        $('.rsvp').animate({
            opacity: 0
        }, 1000, function(){
            $('.rsvp').hide();
        })
    })
})