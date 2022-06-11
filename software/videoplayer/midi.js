var midi, data;

// start talking to MIDI controller
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  console.warn("No MIDI support in your browser")
}

// on success
function onMIDISuccess(midiData) {
  // this is all our MIDI data
  midi = midiData;
  var allInputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  for (var input = allInputs.next(); input && !input.done; input = allInputs.next()) {
    // when a MIDI value is received call the onMIDIMessage function
    input.value.onmidimessage = gotMIDImessage;
  }
}
var dataList = document.querySelector('#midi-data ul')

var keyStates = {};

function trigger(triggerId){

    var newItem = document.createElement('li');
    newItem.appendChild(document.createTextNode(triggerId));
    dataList.appendChild(newItem);
    switch(triggerId){
        case "HIGH_MENUKEY_1":
            break;
        case "HIGH_MENUKEY_2":
            break;
        case "HIGH_MENUKEY_3":
            break;
        case "LOW_MENUKEY_1":
            break;                    
        case "DOUBLE_MENU_KEY":
            break;   
        default:
            console.log("Trigger ID not found" + triggerId);         
    }


}

function checkTwoKeyPress(noteid){

    var show = 0;
    if(noteid==108 && keyStates[21]==1){
        show = 1;
    } else if(noteid==21 && keyStates[108]==1){
        show = 1;
    }

    if(show==1){
        trigger("DOUBLE_MENU_KEY");
    }

}

function gotMIDImessage(messageData) {

    var noteid = messageData.data[1];

    // keyon
    if(messageData.data[0]==144){
        keyStates[noteid] = 1;
    } else if(messageData.data[0]==128){
        keyStates[noteid] = 0;
    }
    console.log(keyStates);
    
    console.log(messageData.data);
    if(messageData.data[0]==144 && messageData.data[1]==105){
        trigger("HIGH_MENUKEY_3");
    }
    if(messageData.data[0]==144 && messageData.data[1]==107){
        trigger("HIGH_MENUKEY_2");
    }
    if(messageData.data[0]==144 && messageData.data[1]==108){
        trigger("HIGH_MENUKEY_1");
        checkTwoKeyPress(noteid);

    }
    if(messageData.data[0]==144 && messageData.data[1]==21){
        trigger("LOW_MENUKEY_1");
        checkTwoKeyPress(noteid);
    }            
    var newItem = document.createElement('li');
    newItem.appendChild(document.createTextNode(messageData.data));
    dataList.appendChild(newItem);
}

// on failure
function onMIDIFailure() {
  console.warn("Not recognising MIDI controller")
}