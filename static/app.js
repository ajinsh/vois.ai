var record = document.querySelector('#record');


console.log('inside app.js')

var record = document.querySelector('#record');
var stop = document.querySelector('#stop');
var par  = document.querySelector('#headr');

stop.disabled = true;


//main block for doing the audio recording

if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  var constraints = { audio: true };
  var chunks = [];

  var onSuccess = function(stream) {

    var mediaRecorder = new MediaRecorder(stream);


    record.onclick = function() {
      mediaRecorder.start();
      par.innerHTML = "Stop recording by pressing the \n STOP RECORDING \n button."
      console.log(mediaRecorder.state);
      console.log("recorder started");
      record.style.background = "#a84610";

      stop.disabled = false;
      record.disabled = true;
    }

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      record.style.background = "";
      record.style.color = "";
      // mediaRecorder.requestData();

      stop.disabled = true;
      record.disabled = false;
    }

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      // var clipName = prompt('Enter a name for your sound clip?','My unnamed clip');
      // console.log(clipName);
      // var clipContainer = document.createElement('article');
      // var clipLabel = document.createElement('p');
      // var audio = document.createElement('audio');
      // var deleteButton = document.createElement('button');
     
      // clipContainer.classList.add('clip');
      // audio.setAttribute('controls', '');
      // deleteButton.textContent = 'Delete';
      // deleteButton.className = 'delete';

      // if(clipName === null) {
      //   clipLabel.textContent = 'My unnamed clip';
      // } else {
      //   clipLabel.textContent = clipName;
      // }

      // clipContainer.appendChild(audio);
      // clipContainer.appendChild(clipLabel);
      // clipContainer.appendChild(deleteButton);
      // soundClips.appendChild(clipContainer);

      // audio.controls = true;
      var blob = new Blob(chunks, { 'type' : 'audio/raw ' });
      chunks = [];
       var a = document.createElement('a');
      var audioURL = window.URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = audioURL;
      a.download = 'test.raw';
      a.click();
      window.URL.revokeObjectURL(audioURL);
      //audio.src = audioURL;
      console.log(audioURL);
     console.log("recorder stopped");

    



      // deleteButton.onclick = function(e) {
      //   evtTgt = e.target;
      //   evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      // }

      // clipLabel.onclick = function() {
      //   var existingName = clipLabel.textContent;
      //   var newClipName = prompt('Enter a new name for your sound clip?');
      //   if(newClipName === null) {
      //     clipLabel.textContent = existingName;
      //   } else {
      //     clipLabel.textContent = newClipName;
      //   }
      // }

        var tm = setTimeout(reDirect, 10000); 
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
      console.log("inside ondataavailable")
    }
   
  }

  function reDirect() {
    window.location.href = "../analyze/";
  }


  var onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

} else {
   console.log('getUserMedia not supported on your browser!');
}

