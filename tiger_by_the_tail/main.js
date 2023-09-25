$(document).ready(function(){


  $('.begin').on('click', function(){
    
    openPopout();

  })

function openPopout(){

  let p = $('.preview-vid');
  console.log(p);
  let w = p.width();
  let h = p.height();
  console.log(p[0].offsetTop);
  console.log(p[0].offsetLeft);
  console.log(w);
  console.log(h);


  let url = "https://tiger.kristinmcwharter.com"

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

});



//   https://tiger-by-the-tail-sequence.herokuapp.com/

// <p>Headphones are a must.</p>
//           <p>For the best experience, this work should be played on a computer with basic graphics capabalities and a stable internet connection.</p>
//           <p>This experience will use 50Mb.</p>

