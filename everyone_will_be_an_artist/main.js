$(document).ready(function(){


  $('.popout').on('click', function(){ openPopout();})
  $('.preview-image').on('click', function(){ openPopout();})
  $('.popout-overlay').on('click', function(){ openPopout();})

  function openPopout(){

    
    let url = "https://jasons-stellar-project-02697f.webflow.io/"

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