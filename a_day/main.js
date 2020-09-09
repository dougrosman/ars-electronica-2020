$(document).ready(function(){


  $('.begin').on('click', function(){
    
    openPopout();

  })

  function openPopout(){

    let p = $('.preview-vid');

    let url = "http://lingyuzeng.com/day.html"

    let options = `
    width=${1018},
    height=${747},
    toolbar=no,
    statusbar=no,
    location=no,
    scrollbars=no`

    window.open(url, 'Exodus', options)
  }
});