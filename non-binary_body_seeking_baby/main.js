$(document).ready(function(){

  for(let i = 1; i < 49; i++){
    let imageFile = `images/bsb${i}.jpg`
    
    let imageElement = `<div style="background-image: url(${imageFile});" class="bsb"/></div>`;

    $("#flipbook").append(imageElement);
  }

  let w = $('.main-content').width()*0.98;
  let h = (w/2)*0.75;

  $("#flipbook").turn({
    width: w,
    height: h,
	  autoCenter: true
  });

  // let statementImg = `<img class="birth-announcement" src="images/addison.jpg" alt="Birth Announcement"/>`
  
  // // let ready = true;
  // // $('.fa-angle-down').on('click', function(){
  // //     if(ready){ready=false; $('.sidebar-medium').after(statementImg); }
  // // })

  
  // // $(window).on('wheel', function(){
  // //     if(ready){ready=false; $('.sidebar-medium').after(statementImg); }
  // // })

  // $('.sidebar-medium').after(statementImg);

  
  
  $(window).resize(function(){
    w = $('.main-content').width()*0.98;
    h = (w/2)*0.75;
    $("#flipbook").turn("size", w, h);
  })

}); 