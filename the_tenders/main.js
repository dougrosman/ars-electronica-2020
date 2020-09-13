$(document).ready(function(){


  let abeStatement = `Abraham Avnisan is an interdisciplinary artist whose work is situated at the intersection of image, text and code. Using a host of emerging technologies including 3D scanning, augmented reality and virtual reality, he creates applications for mobile devices, interactive installations and technologically mediated performances that seek to subvert dominant narratives through embodied encounters with language. Abraham is an Assistant Professor of Emerging Media & Technology and Journalism & Mass Communication at Kent State University.`
  let abeSidebarStatement = `<p class="sidebar-statement">${abeStatement}</p>`

  let abeSocials = `<a class="sidebar-socials-links" href="https://abrahamavnisan.com" target="_blank">Website</a>`

    $(".sidebar-socials").after(`<div class="sidebar-statement">${abeSidebarStatement}</div>`);
    $(".sidebar-statement").after(`<div class="sidebar-socials">[${abeSocials}]</div>`);



})