$(document).ready(function(){


  let avivaStatement = `Ava Aviva Avnisan is an interdisciplinary artist whose work is situated at the intersection of image, text and code. Using a host of emerging technologies including 3D scanning, augmented reality and virtual reality, he creates applications for mobile devices, interactive installations and technologically mediated performances that seek to subvert dominant narratives through embodied encounters with language. Ava Aviva is an Assistant Professor of Emerging Media & Technology and Journalism & Mass Communication at Kent State University.`
  let avivaSidebarStatement = `<p class="sidebar-statement">${avivaStatement}</p>`

  let avivaSocials = `<a class="sidebar-socials-links" href="https://avivaavnisan.com/" target="_blank">Website</a>`

    $(".sidebar-socials").after(`<div class="sidebar-statement">${avivaSidebarStatement}</div>`);
    $(".sidebar-statement").after(`<div class="sidebar-socials">[${avivaSocials}]</div>`);



})