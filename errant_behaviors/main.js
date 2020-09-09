// let videos = [
//   'aimless',
//   'bump',
//   'cut-out',
//   'dissect',
//   'eat',
//   'flirt',
//   'gyrate',
//   'hiccup',
//   'invade',
//   'jumble',
//   'lasso',
//   'mess',
//   'nibble',
//   'open',
//   'plop',
//   'pull',
//   'retreat',
//   'slug',
//   'swarm',
//   'tumble',
//   'urge',
//   'whack',
//   'worm'
// ]


$(document).ready(function(){

  let left = document.getElementById("left-channel");
  let right = document.getElementById("right-channel");
  let startingIndex = Math.floor(Math.random()*4);
  let leftPlaylistIndex = startingIndex;
  let rightPlaylistIndex = startingIndex;
  let leftVidIndex = 0;
  let rightVidIndex = 0;
  let elem = document.querySelector(".vid-container");

  // let leftPlaylists = [
  //   ['bump', 'aimless', 'cut-out', 'dissect', 'eat', 'flirt', 'jumble', 'plop', 'pull', 'retreat', 'swarm', 'slug'],
  //   ['pull', 'dissect', 'retreat', 'eat', 'jumble', 'slug', 'bump', 'aimless', 'flirt', 'swarm', 'plop', 'cut-out'],
  //   ['slug', 'dissect', 'aimless', 'eat', 'cut-out', 'retreat', 'jumble', 'swarm', 'plop', 'bump', 'pull', 'flirt'],
  //   ['aimless', 'jumble', 'dissect', 'swarm', 'cut-out', 'slug', 'bump', 'retreat', 'pull', 'plop', 'flirt', 'eat']
  // ];

  // let rightPlaylists = [
  //   ['gyrate', 'hiccup', 'invade', 'lasso', 'mess', 'nibble', 'open', 'tumble', 'urge', 'worm', 'whack'],
  //   ['mess', 'lasso', 'tumble', 'whack', 'gyrate', 'open', 'worm', 'hiccup', 'urge', 'invade', 'nibble'],
  //   ['lasso', 'gyrate', 'tumble', 'nibble', 'worm', 'open', 'hiccup', 'mess', 'invade', 'whack', 'urge'],
  //   ['worm', 'open', 'whack', 'gyrate', 'hiccup', 'invade', 'urge', 'mess', 'nibble', 'lasso', 'tumble']
  // ];

  // compressed videos removed
  let leftPlaylists = [
    ['bump', 'aimless', 'cut-out', 'dissect', 'eat', 'flirt', 'jumble', 'plop', 'pull', 'retreat', 'slug'],
    ['pull', 'dissect', 'retreat', 'eat', 'jumble', 'slug', 'bump', 'aimless', 'flirt', 'plop', 'cut-out'],
    ['slug', 'dissect', 'aimless', 'eat', 'cut-out', 'retreat', 'jumble', 'plop', 'bump', 'pull', 'flirt'],
    ['aimless', 'jumble', 'dissect', 'cut-out', 'slug', 'bump', 'retreat', 'pull', 'plop', 'flirt', 'eat']
  ];

  let rightPlaylists = [
    ['invade', 'lasso', 'mess', 'nibble', 'open', 'tumble', 'urge', 'worm'],
    ['mess', 'lasso', 'tumble', 'open', 'worm', 'urge', 'invade', 'nibble'],
    ['lasso', 'tumble', 'nibble', 'worm', 'open', 'mess', 'invade', 'urge'],
    ['worm', 'open', 'invade', 'urge', 'mess', 'nibble', 'lasso', 'tumble']
  ];

  let playlists = [leftPlaylists, rightPlaylists];

  $('.fa-angle-down').on('click', function(){
    startVids(1);
  })
  // $(window).on('wheel', function(){
  //   startVids(1);
  // })



  function startVids(s){
    
    left.src = `videos/${playlists[0][leftPlaylistIndex][leftVidIndex]}.mp4`;
    right.src =`videos/${playlists[1][rightPlaylistIndex][rightVidIndex]}.mp4`;
     
    setTimeout(function(){
      $(".vid-container").css("display", "flex").animate({
        opacity: 1
      }, 3000);

      right.play();
      left.play();
      left.muted = false;
      right.muted = false;
     }, 5000/s);
  }

  // set video source after certain time
  

   // display the videos after the videos have loaded.
   
   
  left.addEventListener('ended', function(){
    console.log("left ended");
    nextVideo(0);
  });
  right.addEventListener('ended', function(){
    console.log("right ended");
    nextVideo(1);
  });

  function nextVideo(p) {
    
    if (p == 0) {
      console.log("left");
      // once the last video of the playlist has been reached...
      if(leftVidIndex == playlists[p][leftPlaylistIndex].length - 1) {
        leftVidIndex = 0; // reset the vid index
        // if the last playlist has just finished playing... 
        if(leftPlaylistIndex == playlists[0].length-1){
          leftPlaylistIndex = 0; // reset to first playlist
        } else {
          leftPlaylistIndex++; // otherwise, increment the playlist index
        }
      } else {
        leftVidIndex++;
      }

      left.src = `videos/${playlists[0][leftPlaylistIndex][leftVidIndex]}.mp4`
      console.log("left.src: " + left.src);
    } else {
      console.log("right");
      if(rightVidIndex == playlists[p][rightPlaylistIndex].length - 1) {
        rightVidIndex = 0;
        if(rightPlaylistIndex == playlists[1].length-1){
          rightPlaylistIndex = 0;
        } else {
          rightPlaylistIndex++;
        }
      } else {
        rightVidIndex++;
      
      }
      right.src = `videos/${playlists[1][rightPlaylistIndex][rightVidIndex]}.mp4`
      console.log("right.src: " + right.src);
    }
  }

  function checkBrowser(){
    if (navigator.userAgent.search("MSIE") >= 0) { return "MSIE";}
    else if (navigator.userAgent.search("Chrome") >= 0) { return "Chrome" }
    else if (navigator.userAgent.search("CriOS") >= 0) { return("Chrome-iOS") }
    else if (navigator.userAgent.search("Firefox") >= 0) { return "Firefox" }
    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) { return "Safari" }
    else if (navigator.userAgent.search("Opera") >= 0) { return "Opera" }
    else if (navigator.userAgent.search("NET") >= 0) { return "NET" }
    else if (navigator.userAgent.search("Edge") >= 0) { return "Edge" }
    else { return "nobrowser" }
  }

  function playSound(){
    $('.sound').on('click', function(){

    })
  }
});