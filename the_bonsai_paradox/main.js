$(document).ready(function(){

    let ready = true;
    $('.fa-angle-down').on('click', function(){
        if(ready){ready=false; setAutoplay(); }
    })
    $(window).on('wheel', function(){
        if(ready){ready=false; setAutoplay(); }
    })

    function setAutoplay() {
        $('.vids').css('display', 'flex');
        $('.vid').each(function(){
            $(this)[0].autoplay = true;
            $(this)[0].play();
        });
    }
})