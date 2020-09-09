$(document).ready(function(){


  $('.begin').on('click', function(){
    openPopout();
  })

function openPopout(){

  let p = $('.preview-vid');
  console.log(p);
  let w = p.width();
  let h = p.height();
  // console.log(p[0].offsetTop);
  // console.log(p[0].offsetLeft);
  // console.log(w);
  // console.log(h);

  let url = "exodus_build";

  let options = `
  width=${window.innerWidth},
  height=${window.innerHeight},
  toolbar=no,
  statusbar=no,
  location=no,
  scrollbars=no`

  window.open(url, 'Exodus', options)
}

$('.preview-vid').mouseover(function(){
  $('.vid')[0].play();

}).mouseout(function(){
  $('.vid')[0].pause();
})

$('.close').on('click', function(){
  $('.browser-check').animate({
    opacity: 0
  }, 1000, function(){
    $('.browser-check').hide();
  })
})

});