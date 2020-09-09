$(document).ready(function(){

$('.fa-angle-down').on('click', function(){
  cycleImages();
})

let ready = true;
$(window).on('wheel', function(){
  if(ready){
    cycleImages();
    ready = false;
  }
  
})

  function cycleImages(){
    setInterval(function () {
      let newImage = Math.floor(Math.random() * 82) + 1 ;
      let myImageElement = document.getElementById('myImage');
      myImageElement.src = 'images/jsSlides/unknownsoldier' +  newImage + '.jpg';
  }, 7000);
  }
  
})