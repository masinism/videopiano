<?php

// add to rc.local
// php -S 0.0.0.0:8000 -t /opt/videopiano/software/gui/

$out = [];

function getDir($dir, $video_height, $mapping_piano_top_y){

  global $out;

  $files = glob($dir.'/*.webm');

  foreach ($files as $filename) {

    $o = [];
    $o["url"] = "http://videopiano1.local:8000/music/" . $filename; 
    
    $o["track_name"] = $filename;
    $o["track_name"] = str_replace($dir, "", $o["track_name"]);
    $o["track_name"] = str_replace(".mid.webm", "", $o["track_name"]);
    $o["track_name"] = str_replace("_", " ", $o["track_name"]);
  
    $o["type"] = "video/webm";
    $o["composer"] = "";
    $o["credits"] = "";
    $o["video_height"] = 360;
    $o["mapping_piano_top_y"] = 240;
    $o["first_note_time"] = 0;
  
    $out[] = $o;
  
  }

}

getDir("neoconvert",360,245);

print json_encode($out, JSON_PRETTY_PRINT);

?>
