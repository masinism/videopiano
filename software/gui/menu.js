var playList = [];

var currentMenu = 0;

var menuSongs;

function menuGetCurrentItem(){

    return playList[currentMenu];

}


  // load stuffz:
  fetch('input.json')
    .then(response => response.json())
    .then(data => {
      for (var key in data) {
      if (data.hasOwnProperty(key)) {
          var item = data[key];
          if(item.type=="audio/midi"){            
            playList.push({
                url: item.url,
                type: item.type,
                author: item.composer,
                track_name: item.track_name,
                mapping_y: item.mapping_piano_top_y,
                credits : item.credits,
                first_note_time: item.first_note_time
            });   
          }         
        }
      }
      create_menu(playList)
    })
    .catch(error => console.log(error));


    function menuControl(cmd){

        switch(cmd){
            case "down":
                currentMenu++;
                if(currentMenu>=playList.length){
                    currentMenu = 0;
                }
            break;
            case "up":
                currentMenu--;
                if(currentMenu<0){
                    currentMenu = playList.length-1;
                }
            break;
        }
        console.log("MENU" + currentMenu);
        menuSongs.setIndex(currentMenu);

    }

    function create_menu(items){
        
        positionMenu();

        menuSongs = new SpinnerPicker(
            document.getElementById("song-menu"), 
            function(index) {
                if(index < 0 || index >= items.length) {
                    return null;
                }
                return items[index]
            }, 
            //config
            { 
              index: 0, 
              selection_color: "black", 
              font: "Helvetica",
              onkeydown: false
            },
            function(index) { }
        );
        // document.getElementById('song-menu').focus();
    }

    function positionMenu(){
        
        document.getElementById('song-menu').style.top = conf.projectionAreaTop + "px";
        document.getElementById('song-menu').style.height = (conf.projectionPianoTop-conf.projectionAreaTop) + "px";


    }