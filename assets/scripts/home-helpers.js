$(document).ready(function(){


    // fix smooth scrolling issue on ios safari
    let deviceAgent = navigator.userAgent.toLowerCase();
    let agentID = deviceAgent.match(/(iPad|iPhone|iPod)/i);
    if (agentID) {       
       $('.sidebar').css('-webkit-overflow-scrolling', 'touch');
    }

    let debug = false;
    let s = .9;

    if(debug) {
        s = 0;
        main();
        $('.splash').hide();
        toggleSidebar(true);
    }

    $('.logo').on('click', function(){
        $('.splash').animate({
            opacity: 0
        }, 1000*s, function(){
            $('.splash').hide();
            main();
        })
    })
    

    function main(){
        insertFavicon();
        insertPreheader();
        resetScroll();
        animateTitle(s);
        let displayToggle = false;
        
        $(".info").click(function(){
            displayToggle = !displayToggle
            toggleSidebar(displayToggle)
        });

        let ready = true;
        $('.fa-angle-down').on('click', function(){
            if(ready){ready=false; scrollToContent(s); }
        })

        
        $(window).on('wheel', function(){
            if(ready){ready=false; scrollToContent(s/1); }
        })
        
    }

    function animateTitle(_speed) {
        $('.wrapper').css('display', 'flex');
        $(".header-titles").delay(_speed * 250).animate({
            opacity: 1
        }, _speed * 1500, function(){
            $(".fa-angle-down").delay(_speed * 250).animate({
                opacity: 1
            }, _speed * 1000);
            $('.top-bar').delay(_speed * 250).css('display', 'flex').animate({
                opacity: 1
            }, _speed * 1000);
        })
    }

    function scrollToContent(_speed){
        $(".fa-angle-down").delay(_speed * 200).css('cursor', 'default').animate({
            opacity: 0
        }, _speed * 1000, function(){
            // $(".fa-angle-down").hide();
            $(".main-content").css('display', 'flex').animate({
                opacity: 1,
            }, _speed * 2400);
            let offsets = calculateOffsets();
            //console.log(offsets);
            $('html, body').animate({scrollTop: offsets[0]-60}, 2000);
        });
    }

    function toggleSidebar(displayToggle) { 

        $('.info-toggled').fadeToggle("slow");

        if(displayToggle) {
            $(".sidebar").animate({
                left: 0
            }, 500);
            $(".info-background").animate({
                left: 0
            }, 500)
        } else {
            if(window.innerWidth < 500) {
                $(".sidebar").animate({
                    left: "-105vw"
                }, 500);
                $(".info-background").animate({
                    left: "-105vw"
                }, 500);
            } else {
                $(".sidebar").animate({
                    left: "-530px"
                }, 500);
                $(".info-background").animate({
                    left: "-530px"
                }, 500)
            }
        }
    }

    
    
    function resetScroll() {
        $("html, body").animate({
            scrollTop: 0
        }, 0)
    }

    function calculateOffsets() {
        let offsets = [
            $('#group1').offset().top,
            $('#group2').offset().top,
            $('#group3').offset().top,
            $('#group4').offset().top,
            $('#group5').offset().top,
            $('#group6').offset().top,
        ];
        return offsets;
    }

    function insertPreheader() {
        let preheader = `<preheader class="top-bar">
        <div class="info-background"></div>
        <div class="topbar-left">
          <a class="back" href="..">^</a>
          <div class="info">
            <p class="info-untoggled"><span style="vertical-align: -2px;">i</span></p>
            <p class="info-toggled">[<span style="vertical-align: -2px;">i</span>]</p>
          </div>
        </div>
        <i class="fas fa-expand fullscreen-icon"></i>
      </preheader>
        `
        $('.wrapper').prepend(preheader);

    }


    function scrollLerping() {
        // keep track of how much user has scrolled.
        // if certain threshold is reached, trigger the
        // animation.
        // take scroll control away with this:
        $('html, body').css({
            overflow: 'hidden',
            height: '100%'
        });
    }

    function triggerScroll(){
        let lastScrollTop = 0, delta = 5;
        $(window).scroll(function(){
            var nowScrollTop = $(this).scrollTop();
            if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
                if (nowScrollTop > lastScrollTop){
                    // ACTION ON
                    // SCROLLING DOWN 
                } else {
                    // ACTION ON
                    // SCROLLING UP 
               }
            lastScrollTop = nowScrollTop;
            }
        });
    };
    

    // insert favicon into header
    function insertFavicon() {
        $("head").append(`<link rel="apple-touch-icon" sizes="57x57" href="/assets/favicon/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicon/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicon/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicon/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicon/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicon/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicon/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicon/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/assets/favicon/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">`);
    }
});