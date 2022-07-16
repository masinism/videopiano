<?php

// add to rc.local
// php -S 0.0.0.0:8000 -t /opt/videopiano/software/gui/

$files = glob('neothesia/*.mp4');

$out = [];
foreach ($files as $filename) {

	$o = [];
	$o["url"] = "http://localhost:8000/" + $filename;
	
  $o["track_name"] = $filename;
	$o["track_name"] = str_replace("neothesia/", "", $o["title"]);
	$o["track_name"] = str_replace(".mp4", "", $o["title"]);
	$o["track_name"] = str_replace("-", " ", $o["title"]);

  $o["type"] = "video/mp4";
  $o["composer"] = "";
  $o["credits"] = "";
  $o["video_height"] = 360;
  $o["mapping_piano_top_y"] = 245;
  $o["first_note_time"] = 0;

  $out[] = $o;

}

print json_encode($out, JSON_PRETTY_PRINT);

?>
