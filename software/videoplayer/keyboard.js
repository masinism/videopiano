

document.addEventListener('keydown', function(event) {

    var key_id = event.key;

    if (key_id === "1") {
      //document.getElementById("video").play();
      menuControl("down");
      userInput("LOW_MENUKEY_1");
    }

    if (key_id === "2") {
        mapping.w++;
      //  updateSize();
    }

    if (key_id === "3") {
        mapping.w--;
     //   updateSize();
    }


    if (key_id === "4") {
        mapping.top++;
      //  updateSize();
    }

    if (key_id === "5") {
        mapping.top--;
       // updateSize();
    }

    if (key_id === "6") {
        mapping.speed += 0.1;
      //  video_change_speed();
    }

    if (key_id === "7") {
        mapping.speed -= 0.1;
      //  video_change_speed();
    }

  });