
  
  let artist;
  const artistName = $("title").text();

  const req = new XMLHttpRequest();
  req.open("GET", '../../assets/utils/artist_info.json', true);
  req.send();
  req.onload = parseArtistInfo;

  function parseArtistInfo() {
      const json = JSON.parse(req.responseText);
      
      let found = false;
      let index = 0;
      for(let i = 0; i < json.length; i++) {
          if(artistName == json[i].name){
              artist = json[i];
              break;
          }
      }

      let darkMode = artist.lightmode;
        if(!darkMode){
            document.documentElement.style.setProperty('--white-dark', "#fdfdfd");
            document.documentElement.style.setProperty('--black-light', "#020202");
            document.documentElement.style.setProperty('--white-dark-alpha', "#fdfdfd22");
            document.documentElement.style.setProperty('--black-light-alpha', "#02020222");
        } else {            
            document.documentElement.style.setProperty('--black-light', "#fdfdfd");
            document.documentElement.style.setProperty('--white-dark', "#020202");
            document.documentElement.style.setProperty('--black-light-alpha', "#fdfdfd33");
            document.documentElement.style.setProperty('--white-dark-alpha', "#02020222");
        }
    }
