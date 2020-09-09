$(document).ready(function(){

  let clicked = false;

  
  $('.gal-img').on('click', function(){
    
    let imgFile = $(this)[0].src;
    let imgExt = `${imgFile.split('.').pop()}`;
    let lrgFile = `${imgFile.split('-').shift()}.${imgExt}`;
    let imgPopout = `<div class="modal"><img class="modal-img" src='${lrgFile}'/></div>`
    
    //resizeImage()
    $('body').append(imgPopout);

    $('.modal').animate({
      opacity: 1
    }, 500, function(){
      clicked = !clicked;
    });
  })

 
  $(window).on('click', function(){

    if(clicked) {
      //alert("ok");
      $('.modal').animate({
        opacity: 0
      }, 300, function(){
        // $('.modal-img').remove();
        $('.modal').remove();
        clicked = !clicked;
      })
    }
  })
})