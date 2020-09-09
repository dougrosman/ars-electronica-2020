(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


$(document).ready(function(){

    // fix smooth scrolling issue on ios safari
    let deviceAgent = navigator.userAgent.toLowerCase();
    let agentID = deviceAgent.match(/(iPad|iPhone|iPod)/i);
    if (agentID) {       
       $('.sidebar').css('-webkit-overflow-scrolling', 'touch');
    }

    let debug = false;
    let s = .8;

    if(debug) {
        s = 0;
        main();
        $('.splash').hide();
        //toggleSidebar(true);
    } else {
        main();
    }
    
    function main(){
        insertFavicon();
        insertPreheader();
        resetScroll();
        
        let browser = checkBrowser();
        animateTitle(s);
        let displayToggle = false;
        
        $(".info").click(function(){
            displayToggle = !displayToggle
            toggleSidebar(displayToggle)
        });

        $('.fa-angle-down').on('click', function(){
            scrollToContent(s);
        })
        let workTitle = ($('title')[0].text);
        let noScrollAnimate = "Anne Wilson, with Shawn Decker, Cat Solen, Daniel Torrente";
        let noScrollAnimate2 = "Anaïs Morales";
        let ready = true;
        $(window).on('wheel', function(){
            if(ready && workTitle != noScrollAnimate && workTitle != noScrollAnimate2){ready=false; scrollToContent(s/1.25); }
        })
    }

    function animateTitle(_speed) {
        $(".header-titles").delay(_speed * 250).animate({
            opacity: 1
        }, _speed * 1500, function(){
            $(".fa-angle-down").delay(_speed * 150).animate({
                opacity: 1
            }, _speed * 1000);
            $('.top-bar').delay(_speed * 250).css('display', 'flex').animate({
                opacity: 1
            }, _speed * 1000);
        })
    }

    function scrollToContent(_speed){
        $(".titles").delay(_speed * 200).animate({
            opacity: 0
        }, _speed * 2000, function(){
            $(".titles").hide();
            $(".wrapper").css('display', 'block');
            $(".main-content").css('display', 'flex').animate({
                opacity: 1,
                transform: "translateY(0px)"
            }, _speed * 2400);
        });
    }

    function toggleSidebar(displayToggle) { 

        $('.info-toggled').fadeToggle("slow");

        // if(jQuery.browser.mobile) {
        //     $('.main-content').css('overflow-y', 'hidden');
        // }

        if(displayToggle) {
            $(".sidebar").animate({
                left: 0
            }, 500);
            $(".info-background").animate({
                left: 0
            }, 500);
            if(jQuery.browser.mobile) {
                $('.main-content').css('overflow-y', 'hidden');
            };
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
                if(jQuery.browser.mobile) {
                    $('.main-content').css('overflow-y', 'auto');
                };
            }
        }
    }

    function checkBrowser(){
        if (navigator.userAgent.search("MSIE") >= 0) { return "MSIE";}
        else if (navigator.userAgent.search("Chrome") >= 0) { return "Chrome" }
        else if (navigator.userAgent.search("CriOS") >= 0) { return("Chrome-iOS") }
        else if (navigator.userAgent.search("Firefox") >= 0) { return "Firefox" }
        else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) { return "Safari" }
        else if (navigator.userAgent.search("Opera") >= 0) { return "Opera" }
        else if (navigator.userAgent.search("NET") >= 0) { return "NET" }
        else if (navigator.userAgent.search("Edge") >= 0) { return "Edge" }
        else { return "nobrowser" }
    }
    
    function resetScroll() {
        $("html, body").animate({
            scrollTop: 0
        }, 0)
    }

    let fullscreen = false;
    $(".fullscreen-icon").on('click', function() {
        if(!fullscreen){            
            openFullscreen();
        } else {
            closeFullscreen();
        }
    })

    
    function openFullscreen() {
        let elem = document.querySelector(".wrapper");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }

        fullscreen = !fullscreen;
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        fullscreen = !fullscreen;
    }

    function insertPreheader() {
        let preheader = `<preheader class="top-bar">
        <div class="info-background"></div>
        <div class="topbar-left">
          <a class="back" href="../works">^</a>
          <div class="info">
            <p class="info-untoggled"><span style="vertical-align: -2px;">i</span></p>
            <p class="info-toggled">[<span style="vertical-align: -2px;">i</span>]</p>
          </div>
        </div>
        <i class="fas fa-expand fullscreen-icon"></i>
      </preheader>
        `
        $('.wrapper').prepend(preheader);
        
        if(jQuery.browser.mobile) {
            let safariScrolling = 
                {'display': 'block',
                'overflow-y': 'scroll',
                '-webkit-overflow-scrolling': 'touch'}
            
      
            $('.sidebar').css(safariScrolling);
            $('.fullscreen-icon').hide();
        }


    }
    
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