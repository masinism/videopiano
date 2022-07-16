<?php

// add to rc.local
// php -S 0.0.0.0:8000 -t /opt/videopiano/software/gui/

$files = glob('neothesia/*.mp4');

$out = [];
foreach ($files as $filename) {

	$o = [];
	$o["url"] = "http://videopiano1.local:8000/" . $filename;
	
  $o["track_name"] = $filename;
	$o["track_name"] = str_replace("neothesia/", "", $o["track_name"]);
	$o["track_name"] = str_replace(".mid.mp4", "", $o["track_name"]);
	$o["track_name"] = str_replace("_", " ", $o["track_name"]);

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
