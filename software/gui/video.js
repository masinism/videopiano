
let video = document.querySelector('video');


var currentVideoPianoRatio = 1;

video.addEventListener( "loadedmetadata", function (e) {

    console.log("Loaded. H:" + this.videoHeight);
   // video.style.top = (-(this.videoHeight*currentVideoPianoRatio-(conf.projectionPianoTop - conf.projectionAreaTop )+200)) + "px";
    video.style.top = "-390px"
    video.playbackRate = states.currentSpeed;


}, false );

function adjustVideoSize(){

    video.width = 1280;
   // video.style.top = video.height*currentVideoPianoRatio;
    
}

function videoPlay(d) { 
    states.activeOutput = "video";
    video.src = d.url;

    video.type = d.type;
    video.style.width = (1330) + "px";
    video.style.left = (+7) + "px" ;
    currentVideoPianoRatio = d.mapping_piano_top_y / d.video_height;
    console.log("video ratio: "+currentVideoPianoRatio);
    console.log("video height: "+d.video_height);

    console.log(d);
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
    video.playbackRate = x;
    console.log("Change speed:" + x);
  }