$(document).ready(function(){

  

  let shadow = `<div class="shadow-box"></div>`;
  $('.vimeo-embed').before(shadow);

  $('.fa-angle-down').on('click', function(){ addBoxShadow(); })

  $(window).on('wheel', function(){ addBoxShadow(); })



  function addBoxShadow() {
    let bs = $('.shadow-box');
    let v = $('.vimeo-embed');
    bs.css('max-width', `${v.css('max-width')}`).css('max-height', `${v.css('max-height')}`);
    let maxW = parseInt(bs.css('max-width').split('p').shift());
    let maxH = parseInt(bs.css('max-height').split('p').shift());
    let aspectRatio = maxH/maxW;

    bs.css('height', `${bs.width() * aspectRatio}`);
        
    $(window).on('resize', function() {
      maxW = parseInt(bs.css('max-width').split('p').shift());
      maxH = parseInt(bs.css('max-height').split('p').shift());
      aspectRatio = maxH/maxW;
      bs.css('height', `${bs.width() * aspectRatio}`);
    })
  }
});