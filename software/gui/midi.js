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
/*
function trigger(triggerId){

    // var newItem = document.createElement('li');
    // newItem.appendChild(document.createTextNode(triggerId));
    // dataList.appendChild(newItem);

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
*/

function checkTwoKeyPress(noteid){

    var show = 0;
    if(noteid==108 && keyStates[21]==1){
        show = 1;
    } else if(noteid==21 && keyStates[108]==1){
        show = 1;
    }

    if(show==1){
        userInput("1,9");
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

    if(messageData.data[0]==144 && messageData.data[1]==21){
        userInput("1");
        checkTwoKeyPress(noteid);
    }       
    if(messageData.data[0]==144 && messageData.data[1]==22){
        userInput("2");
    }      
    if(messageData.data[0]==144 && messageData.data[1]==23){
        userInput("3");
    } 
    if(messageData.data[0]==144 && messageData.data[1]==24){
        userInput("4");
    } 
    if(messageData.data[0]==144 && messageData.data[1]==25){
        userInput("5");
    } 
    if(messageData.data[0]==144 && messageData.data[1]==26){
        userInput("6");
    } 
    if(messageData.data[0]==144 && messageData.data[1]==105){
        userInput("7");
    }
    if(messageData.data[0]==144 && messageData.data[1]==107){
        userInput("8");
    }
    if(messageData.data[0]==144 && messageData.data[1]==108){
        userInput("9");
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


document.addEventListener('keyup', function(event) {

    switch(event.key){
        case "1":  gotMIDImessage({data:[144,21,125]}); break;
        case "2":  gotMIDImessage({data:[144,22,125]}); break;
        case "3":  gotMIDImessage({data:[144,23,125]}); break;
        case "4":  gotMIDImessage({data:[144,24,125]}); break;
        case "5":  gotMIDImessage({data:[144,25,125]}); break;
        case "6":  gotMIDImessage({data:[144,26,125]}); break;
        
        case "7":  gotMIDImessage({data:[144,105,125]}); break;
        case "Enter":  gotMIDImessage({data:[144,105,125]}); break;

        case "8":  gotMIDImessage({data:[144,107,125]}); break;
        case "+":  gotMIDImessage({data:[144,108,125]}); break;

        case "9":  gotMIDImessage({data:[144,108,125]}); break;
        case "-":  gotMIDImessage({data:[144,107,125]}); break;

       
    }


  });