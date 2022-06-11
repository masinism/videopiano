
let video = document.querySelector('video');

var currentVideoPianoTop = 0;

video.addEventListener( "loadedmetadata", function (e) {
    var width = this.videoWidth,
        height = this.videoHeight;
        adjustVideoSize(this.videoWidth,this.videoHeight);
        console.log(this.videoHeight);
}, false );

function adjustVideoSize(videofileWidth,videofileHeight){

    video.width = 1280;
    var percentage = currentVideoPianoTop/videofileHeight;
    video.top = video.height*percentage;
    
}

function videoPlay(d) { 
    states.activeOutput = "video";
    video.src = d.url;

    video.type = d.type;
    video.width = 1280;
    currentVideoPianoTop = d.mapping_piano_top_y;
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