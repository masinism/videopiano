
let video = document.querySelector('video');


var currentVideoPianoRatio = 1;

video.addEventListener( "loadedmetadata", function (e) {

    console.log(this.videoHeight);
    video.style.top = (this.videoHeight*currentVideoPianoRatio) + "px";

}, false );

function adjustVideoSize(){

    video.width = 1280;
    video.style.top = video.height*currentVideoPianoRatio;
    
}

function videoPlay(d) { 
    states.activeOutput = "video";
    video.src = d.url;

    video.type = d.type;
    video.width = 1280;
    currentVideoPianoRatio = d.mapping_piano_top_y / d.video_height;
    console.log("ratio: "+currentVideoPianoRatio);

    // video.top = video.height*currentVideoPianoRatio;
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