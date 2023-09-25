$(document).ready(function(){
    
    
    main();

    function main(){
        loadContent();
    }
    function loadContent() {
        let artist;
        const artistName = $("title").text();

        const req = new XMLHttpRequest();
        req.open("GET", '../assets/utils/artist_info.json', true);
        req.send();
        req.onload = parseArtistInfo;

        function parseArtistInfo() {
            const json = JSON.parse(req.responseText);
           
            for(let i = 0; i < json.length; i++) {
                if(artistName == json[i].name){
                    artist = json[i];
                    break;
                }
            }
            updatePageTitle(artist);            
            displayInfo(artist);
            sidebarInfo(artist);

            let darkMode = artist.darkmode;
            toggleDarkMode(artist.darkmode);

            $(".darkmode").click(function(){
                darkMode = toggleDarkMode(darkMode);
            });
        }
    }

    function toggleDarkMode(_darkmode) {
        if(_darkmode){
            document.documentElement.style.setProperty('--white-dark', "#fdfdfd");
            document.documentElement.style.setProperty('--black-light', "#020202");
            document.documentElement.style.setProperty('--white-dark-alpha', "#fdfdfd44");
            document.documentElement.style.setProperty('--black-light-alpha', "#02020255");
            return !_darkmode;
        } else {            
            document.documentElement.style.setProperty('--black-light', "#fdfdfd");
            document.documentElement.style.setProperty('--white-dark', "#020202");
            document.documentElement.style.setProperty('--black-light-alpha', "#fdfdfd66");
            document.documentElement.style.setProperty('--white-dark-alpha', "#02020277");
            return !_darkmode;
        }
    }

    function updatePageTitle(_artist) {
        
        let name = _artist.name;
        let title = _artist.title;
        let ars = "Ars Electronica 2020";
        let saic = "SAIC";
        let dis = "[Dis]position"
        $("title").text(`${title} — ${name} – ${saic} – ${ars}: ${dis}`);
        // console.log($("title").text());
    }

    function displayInfo(_artist) {
        let title = `<h1 class="title">${_artist.title}</h1>`;
        let name = `<h2 class="name">${_artist.name}</h2>`;

        $(".header-titles").append(title, name);
        // $(".main-content").css("top", `${$(".header-titles").height}`);
    }

    function sidebarInfo(_artist) {

        let title = `<h3 class="sidebar-title">${_artist.title}</h3>`;
        let name = `<h4 class="sidebar-name">${_artist.name}</h4>`;
        let year = `<h6 class="sidebar-year">${_artist.year}</h6>`;
        let medium = `<h6 class="sidebar-medium">${_artist.medium}</h6>`;
        let lineBreak = `<div class="sidebar-linebreak" style="width: 100%; height: 1px; background-color: darkgray; margin: 30px auto;"></div>`;
        let footer = `<footer class="footer">© SAIC ATS 2020</footer>`

        $(".sidebar-content").append(title, name, year, medium);
        
        let descriptionSplit = _artist.description.split("\n");
        for(let i = descriptionSplit.length; i > 0; i--) {
            let p = descriptionSplit[i-1];
            let description = `<p class="sidebar-description">${p}</p>`;
            $(".sidebar-medium").after(description); 
        }
        $(".sidebar-description").last().after(lineBreak);

        let statementSplit = _artist.statement.split("\n");
        for(let i = statementSplit.length; i > 0; i--) {
            let p = statementSplit[i-1];
            let statement = `<p class="sidebar-statement">${p}</p>`;
            $(".sidebar-linebreak").after(statement);
        }

        let socials = _artist.social;

        let socialString = "";

        for(let i = 0; i < socials.length; i++) {
            let platform = Object.keys(socials[i])[0];
           

            if(platform === "website") {
                let site = socials[i].website;
                
                let siteLink = `<a class="sidebar-socials-links" href="${site}" target="_blank">Website</a>`;
                socialString += `[${siteLink}]`
            }

            if(platform === "instagram") {
                let ig = socials[i].instagram;
                let igLink = `<a class="sidebar-socials-links" href="https://www.instagram.com/${ig}" target="_blank">Instagram</a>`;
                socialString += ` [${igLink}]`
            }

            if(platform === "facebook") {
                let fb = socials[i].facebook;
                let fbLink = `<a class="sidebar-socials-links" href="https://www.facebook.com/${fb}" target="_blank">Facebook</a>`;
                socialString += ` [${fbLink}]`
            }

            if(platform === "Vimeo") {
                let vimeo = socials[i].Vimeo;
                let vimeoLink = `<a class="sidebar-socials-links" href="${vimeo}" target="_blank">Vimeo</a>`;
                socialString += ` [${vimeoLink}]`
            }

        }
        $(".sidebar-statement").after(`<div class="sidebar-socials">${socialString}</div>`);

        $('.sidebar-content').append(footer);
        
        if(_artist.name == "Judd Morrissey & Mark Jeffrey (ATOM-r), and Ava Aviva Avnisan") {
            let avivaStatement = `Ava Aviva Avnisan is an interdisciplinary artist whose work is situated at the intersection of image, text and code. Using a host of emerging technologies including 3D scanning, augmented reality and virtual reality, he creates applications for mobile devices, interactive installations and technologically mediated performances that seek to subvert dominant narratives through embodied encounters with language.`
            let avivaSidebarStatement = `<p class="sidebar-statement">${avivaStatement}</p>`

            let avivaSocials = `<a class="sidebar-socials-links" href="https://avivaavnisan.com/" target="_blank">Website</a>`

            $(".sidebar-socials").last().after(`<div class="sidebar-statement">${avivaSidebarStatement}</div>`);
            $(".sidebar-statement").last().after(`<div class="sidebar-socials">[${avivaSocials}]</div>`);
        }
    }
});