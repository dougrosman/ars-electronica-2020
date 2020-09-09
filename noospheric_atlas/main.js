$(document).ready(function(){

  $('.popout').on('click', function(){
    
    openPopout();

  })

  function openPopout(){

    
    let url = "http://maps.generalradio.org/"

    let options = `
    width=${window.innerWidth},
    height=${window.innerHeight},
    toolbar=no,
    statusbar=no,
    location=no,
    scrollbars=no`

    window.open(url, 'Exodus', options)
  }
})