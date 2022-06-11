
let video = document.querySelector('video');

function videoPlay(d) { 
    states.activeOutput = "video";
    video.src = d.url;
    video.type = d.type;
    video.width = 1280;
    // video.height = d.mapping_piano_top_y
    hide_element('song-menu')
    show_element('video')
    video.play(); 
  };

  function videoStop(){
    states.activeOutput = "";
    video.src = "";
    show_element('song-menu');
    hide_element('video');  
  }

  function videoPause() { 
    video.pause();
  } 
  function videoJumpBack() { 
    video.currentTime -= 20;
  } 
  function videoChangeSpeed(x){
    video.playbackRate += x;
  }