
$(document).ready(function(){

    let esShort2  = `[Dis]position is a virtual exhibition space that exploits its immaterial status to bring together digital and physical artworks and environments. Using the prefix dis- as an organizing principle, the artworks in the exhibition act as a reversing force, embracing the conditions of physical dislocation to foreground the inherent potential of shared aesthetic experience. Together, these artworks suggest the impossibility of a virtual utopia and the urgency of reimagining our collective reality.`

    let esShort = `[Dis]position is a virtual exhibition that exploits its immaterial status to bring together digital and physical artworks and environments. Using the prefix dis-&nbsp;as an organizing principle, the artworks in the exhibition act as a reversing force, embracing the conditions of physical dislocation to foreground the inherent potential of shared aesthetic experience.`

    let esLong = `Six months ago society slammed the brakes, and as we struggle to reorient ourselves—in time, in space, and in relation to one another—the past becomes difficult to distinguish from the future. In this haze, one thing is clear: the present is our moment, and our chance to build the world we want to inhabit.
    <br><br> 
    [Dis]position is a virtual exhibition that embraces its immaterial status to bring together digital and physical artworks and environments. Folding the map in on itself to fuse distant geographies, [Dis]position underscores the impossibility of a virtual utopia and the urgency of reimagining our collective reality. Using the prefix dis- as an organizing principle, the artworks in the exhibition act as a reversing force, embracing the conditions of physical dislocation to foreground the inherent potential of shared aesthetic experience.
    <br><br>
    The first of its type in the United States, SAIC’S Art & Technology Studies department was established in 1969 with the introduction of a single course operating at the intersection of art, science, and technology. Since its inception, the program has continually pioneered the use of emerging technologies in contemporary art, developed new models of artistic practice and integrated these models into the curriculum of one of the world’s most influential art and design schools.
    <br><br>
    <p class="ok"><strong>Curated by:</strong> Duncan Bass, Bopha Hul, Patrick O’Shea and Doug Rosman</p><p class="ok"><strong>Web Development:</strong> Doug Rosman</p>
    <div class="branding">
    <img class="saic" src="assets/images/branding/saic-ats-logo.png"/>
    <img class="saic" src="assets/images/branding/ars-logo.png"/>
    </div>`
    
    main();

    function main(){
        toggleDarkMode(false);
        displayInfo();
        sidebarInfo();
    }

    function toggleDarkMode(_darkmode) {
        if(_darkmode){
            document.documentElement.style.setProperty('--white-dark', "#fdfdfd");
            document.documentElement.style.setProperty('--black-light', "#020202");
            document.documentElement.style.setProperty('--white-dark-alpha', "#fdfdfd33");
            document.documentElement.style.setProperty('--black-light-alpha', "#02020255");
            return !_darkmode;
        } else {            
            document.documentElement.style.setProperty('--black-light', "#fdfdfd");
            document.documentElement.style.setProperty('--white-dark', "#020202");
            document.documentElement.style.setProperty('--black-light-alpha', "#fdfdfd55");
            document.documentElement.style.setProperty('--white-dark-alpha', "#02020277");
            return !_darkmode;
        }
    }


    function displayInfo() {

        let title = `<div id="ats" class="group-title">
        <span class="dis-group" id="dis1">
          <span class="dis-dis" id="ats2">[Dis]</span><span class="dis-suffix">position</span>
          <p class="group-description" id="ats3">Art & Technology Studies at the School of the Art Institute of Chicago 
          </p>
        </span>
      </div>`;
        let name = `<h2 class="name">${esLong}</h2>`;
        let arrow = `<i class="fas fa-angle-down"></i>`;

        $(".header-titles").append(title, name, arrow);
        // $(".main-content").css("top", `${$(".header-titles").height}`);
    }

    function sidebarInfo() {

        let title = `<h3 class="sidebar-title">[Dis]position</h3>`;
        let name = `<h4 class="sidebar-name">Ars Electronica 2020</h4>`;
        let info = `<div class="sidebar-info">
            <h5>The School of the Art Institute of Chicago</h5>
            <h5>Art and Technology Studies</h5>
        </div>`
        let exhibitionStatement = `<p class="exhibition-statement">${esShort}</p>`
        let lineBreak = `<div class="sidebar-linebreak" style="width: 100%; height: 1px; background-color: darkgray; margin: 30px auto;"></div>`;
        let credits = `<div class="sidebar-credits">
            <h5>Curated by:</h5>
            <p>Duncan Bass, Bopha Hul, Patrick O’Shea and Doug Rosman</p>
            <h5>Web development:</h5>
            <p>Doug Rosman</p>
        </div>`
        let footer = `<footer class="footer"><p>© SAIC ATS 2020</p></footer>`
    
        let workLinks = `<nav class="work-links"></nav>`;
    
        let addison = `
                        <p class="work-link-text">
                            <a class="work-link" href='non-binary_body_seeking_baby'>Non-binary body seeking baby to womb with</a>
                            <span class="artist-name">Addison Leon</span>
                        </p>
        `
        let alan = `
                        <p class="work-link-text">
                            <a class="work-link" href='the_ambulatory_v3'>The Ambulatory_v3</a>
                            <span class="artist-name">Alan Perry</span>
                        </p>
        `
        let anais = `
                        <p class="work-link-text">
                            <a class="work-link" href='study_of_a_burial_at_ornans_study'>(COVID-19 Quarantined) Study of 'A Burial at Ornans Study (2017)'</a>
                            <span class="artist-name">Anaïs Morales</span>
                        </p>
        `
        let anna = `
                        <p class="work-link-text">
                            <a class="work-link" href='old_things_being_thought_about'>Old Things Being Thought About</a>
                            <span class="artist-name">Anna Christine Sands</span>
                        </p>
        `
       let ashara = `
                        <p class="work-link-text">
                            <a class="work-link" href='momma_doesnt_cry'>momma doesnt cry</a>
                            <span class="artist-name">Ashara</span>
                        </p>
        `
       let blake = `
                        <p class="work-link-text">
                            <a class="work-link" href='portrait_of_an_unknown_soldier'>Portrait of an Unknown Soldier</a>
                            <span class="artist-name">Blake Fall-Conroy</span>
                        </p>
        `
       let brett = `
                        <p class="work-link-text">
                            <a class="work-link" href='noospheric_atlas'>Noospheric Atlas</a>
                            <span class="artist-name">Brett Ian Balogh</span>
                        </p>
        `
       let bun = `
                        <p class="work-link-text">
                            <a class="work-link" href='lilac_poem'>Lilac Poem</a>
                            <span class="artist-name">Bun Stout</span>
                        </p>
        `
       let chengan = `
                        <p class="work-link-text">
                            <a class="work-link" href='everybody_wants_to_hear_whats_already_been_told'>Everybody Wants to Hear What's Already Been Told</a>
                            <span class="artist-name">Chengan Xia</span>
                        </p>
        `
       let eduardo = `
                        <p class="work-link-text">
                            <a class="work-link" href='inner_telescope'>Inner Telescope (Ars Electronica Cut)</a>
                            <span class="artist-name">Eduardo Kac</span>
                        </p>
        `
       let ethan = `
                        <p class="work-link-text">
                            <a class="work-link" href='remnants'>Remnants</a>
                            <span class="artist-name">Ethan Proia</span>
                        </p>
        `
       let gloria = `
                        <p class="work-link-text">
                            <a class="work-link" href='the_bonsai_paradox'>The Bonsai Paradox: A Celadon Future</a>
                            <span class="artist-name">Gloria Fan Duan</span>
                        </p>
        `
       let jakyung = `
                        <p class="work-link-text">
                            <a class="work-link" href='exodus'>Exodus</a>
                            <span class="artist-name">Jakyung Lee</span>
                        </p>
        `
        let james = `
                        <p class="work-link-text">
                            <a class="work-link" href='hotspot_wifi_hertz'>HotSpot: WiFi Hertz</a>
                            <span class="artist-name">James Hartunian</span>
                        </p>
        `
        let jason = `
                        <p class="work-link-text">
                            <a class="work-link" href='everyone_will_be_an_artist'>Everyone Will Be An Artist</a>
                            <span class="artist-name">Jason Bozhi Zhao</span>
                        </p>
        `
        let jiwon = `
                        <p class="work-link-text">
                            <a class="work-link" href='transient_home'>Transient Home</a>
                            <span class="artist-name">Jiwon Ham</span>
                        </p>
        `
        let judd = `
                        <p class="work-link-text">
                            <a class="work-link" href='the_tenders'>The Tenders: Embrasures in the Fort’s Collapse</a>
                            <span class="artist-name">Judd Morrissey & Mark Jeffrey (ATOM-r), and Abraham Avnisan</span>
                        </p>
        `
        let julia = `
                        <p class="work-link-text">
                            <a class="work-link" href='fluffy_geography'>Fluffy Geography</a>
                            <span class="artist-name">Julia Tsai</span>
                        </p>
        `
        let jungho = `
                        <p class="work-link-text">
                            <a class="work-link" href='pedway_odyssey'>Pedway Odyssey</a>
                            <span class="artist-name">Jungho Park</span>
                        </p>
        `
        let kio = `
                        <p class="work-link-text">
                            <a class="work-link" href='memory_of_a_veteran'>Memory of a Veteran</a>
                            <span class="artist-name">Kio Zhu</span>
                        </p>
        `
        let kristin = `
                        <p class="work-link-text">
                            <a class="work-link" href='tiger_by_the_tail'>Tiger by the Tail</a>
                            <span class="artist-name">Kristin McWharter</span>
                        </p>
        `
        let lee = `
                        <p class="work-link-text">
                            <a class="work-link" href='reconciliation_render_4'>Reconciliation: Render 4</a>
                            <span class="artist-name">Lee Blalock (multiples of)</span>
                        </p>
        `
        let lingyu = `
                        <p class="work-link-text">
                            <a class="work-link" href='a_day'>A day</a>
                            <span class="artist-name">Lingyu Zeng</span>
                        </p>
        `
        let lola = `
                        <p class="work-link-text">
                            <a class="work-link" href='powers_of_success'>Powers of Success</a>
                            <span class="artist-name">Lola Blake</span>
                        </p>
        `
        let meimei = `
                        <p class="work-link-text">
                            <a class="work-link" href='carving_carps'>Carving Carps</a>
                            <span class="artist-name">Meimei Song</span>
                        </p>
        `
        let patrick = `
                        <p class="work-link-text">
                            <a class="work-link" href='aggregate_horizon'>Aggregate Horizon</a>
                            <span class="artist-name">Patrick O'Shea</span>
                        </p>
        `
        let shawn = `
                        <p class="work-link-text">
                            <a class="work-link" href='errant_behaviors'>Errant Behaviors</a>
                            <span class="artist-name">Anne Wilson, with Shawn Decker, Cat Solen, Daniel Torrente</span>
                        </p>
        `
        let tongqi = `
                        <p class="work-link-text">
                            <a class="work-link" href='boundaries'>Boundaries</a>
                            <span class="artist-name">Tongqi Wang</span>
                        </p>
        `
        let william = `
                        <p class="work-link-text">
                            <a class="work-link" href='merganser_migrations'>Merganser Migrations</a>
                            <span class="artist-name">William Harper</span>
                        </p>
        `
        let yimin = `
                        <p class="work-link-text">
                            <a class="work-link" href='assimiliation'>Assimiliation</a>
                            <span class="artist-name">Yimin Zheng</span>
                        </p>
        `
        let zhong = `
                        <p class="work-link-text">
                            <a class="work-link" href='the_tree_project'>The Tree Project</a>
                            <span class="artist-name">Zhong Ren</span>
                        </p>
        `
        
    
        let disorient = `
            <div class="sidebar-group" id="disorient">
                <h3 class='group-name'>[Dis]orient</h3>
                ${eduardo}
                ${jakyung}
                ${bun}
                ${tongqi}
                ${lingyu}
            </div>
        `
        
        let disconnect = `
            <div class="sidebar-group" id="disconnect">
                <h3 class='group-name'>[Dis]connect</h3>
                ${lee}
                ${ashara}
                ${anna}
                ${julia}
                ${shawn}
            </div>
        `
    
        let discontent = `
            <div class="sidebar-group" id="discontent">
                <h3 class='group-name'>[Dis]content</h3>
                ${gloria}
                ${blake}
                ${anais}
                ${judd}
                ${alan}
                ${chengan}
                ${kio}
            </div>
        `
            
        let displace = `
            <div class="sidebar-group" id="displace">
                <h3 class='group-name'>[Dis]place</h3>
                ${lola}
                ${jiwon}
                ${addison}
                ${ethan}
                ${meimei}
                ${yimin}
            </div>
        `
            
    
        let dislocation = `
            <div class="sidebar-group" id="dislocation">
                <h3 class='group-name'>[Dis]location</h3>
                ${brett}
                ${william}
                ${james}
                ${kristin}
                ${patrick}
                ${jungho}
                ${zhong}
            </div>
        ` 
    
        let dispossess = `
            <div class="sidebar-group" id="dispossess">
                <h3 class='group-name'>[Dis]possess</h3>
                ${jason}
            </div>
        `
    
    
        $(".sidebar-content").append(title, name, info, exhibitionStatement, lineBreak, workLinks, credits);
        $('.work-links').append(disorient, lineBreak, disconnect, lineBreak, discontent, lineBreak, displace, lineBreak, dislocation, lineBreak, dispossess)

        $(".sidebar-credits").after(footer);
    
      }
});