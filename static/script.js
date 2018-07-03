$(document).ready(function() {
   
    $('#sptext').change(counter);
    $('#sptext').keydown(counter);
    $('#sptext').keypress(counter);
    $('#sptext').keyup(counter);
    $('#sptext').blur(counter);
    $('#sptext').focus(counter);
});

let arr=[];




try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var noteTextarea = $('#sptext');
var instructions = $('#recording-instructions');
var noteContent = '';

// Get all notes from previous sessions and display them.
//var notes = getAllNotes();
//renderNotes(notes);



/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }
};





recognition.onstart = function() { 
  instructions.html('<p> Voice recognition activated.<br> Try speaking into the microphone. </p>');
}

recognition.onspeechend = function() {
  instructions.html('<p> Congratulations ! Your speech has been recorded.<br> Please click on Analyze to start analyzing.</p>');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.html('No speech was detected. Try again.');  
  };
}



/*-----------------------------
      App buttons and input 
------------------------------*/

$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});


$('#pause-record-btn').on('click', function(e) {
  recognition.stop();

  instructions.html('<p> Congratulations ! Your speech has been recorded.<br> Please click on Analyze to start analyzing.</p>');

    var x = document.getElementById("an_btn");
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
});


$('#an_btn').on('click', function(e) {
var modal = document.getElementById('myModal');
modal.style.display = "block";
  
  console.log('inside an'+arr);
     var counts = {}, i, value;
  for (i = 0; i < arr.length-1; i++) {
      value = arr[i];
      console.log(arr[i]);
      if (typeof counts[value] === "undefined") {
          counts[value] = 1;
      } else {
          counts[value]++;
      }
  }



// printing to screen
  // console.log(Object.entries(counts));
  for(var i in counts){
    var output = i.toUpperCase() + ' occured ' + counts[i] + ' times';
    if (counts[i] > 2) {
      console.log(output);
       document.getElementById("analytics_count").innerHTML += output + "<br/>";
    }
  }


});



$('#close').on('click', function(e) {
var modal = document.getElementById('myModal');
modal.style.display = "none";
});


// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
  noteContent = $(this).val();
})

// $('#save-note-btn').on('click', function(e) {
//   recognition.stop();

//   if(!noteContent.length) {
//     instructions.text('Could not save empty note. Please add a message to your note.');
//   }
//   else {
//     // Save note to localStorage.
//     // The key is the dateTime with seconds, the value is the content of the note.
//     saveNote(new Date().toLocaleString(), noteContent);

//     // Reset variables and update UI.
//     noteContent = '';
//     renderNotes(getAllNotes());
//     noteTextarea.val('');
//     instructions.text('Note saved successfully.');
//   }
      
// })


// notesList.on('click', function(e) {
//   e.preventDefault();
//   var target = $(e.target);

//   // Listen to the selected note.
//   if(target.hasClass('listen-note')) {
//     var content = target.closest('.note').find('.content').text();
//     readOutLoud(content);
//   }

//   // Delete note.
//   if(target.hasClass('delete-note')) {
//     var dateTime = target.siblings('.date').text();  
//     deleteNote(dateTime);
//     target.closest('.note').remove();
//   }
// });



// /*-----------------------------
//       Speech Synthesis 
// ------------------------------*/

// function readOutLoud(message) {
// 	var speech = new SpeechSynthesisUtterance();

//   // Set the text and voice attributes.
// 	speech.text = message;
// 	speech.volume = 1;
// 	speech.rate = 1;
// 	speech.pitch = 1;
  
// 	window.speechSynthesis.speak(speech);
// }



// /*-----------------------------
//       Helper Functions 
// ------------------------------*/

// function renderNotes(notes) {
//   var html = '';
//   if(notes.length) {
//     notes.forEach(function(note) {
//       html+= `<li class="note">
//         <p class="header">
//           <span class="date">${note.date}</span>
//           <a href="#" class="listen-note" title="Listen to Note">Listen to Note</a>
//           <a href="#" class="delete-note" title="Delete">Delete</a>
//         </p>
//         <p class="content">${note.content}</p>
//       </li>`;    
//     });
//   }
//   else {
//     html = '<li><p class="content">You don\'t have any notes yet.</p></li>';
//   }
//   notesList.html(html);
// }


// function saveNote(dateTime, content) {
//   localStorage.setItem('note-' + dateTime, content);
// }


// function getAllNotes() {
//   var notes = [];
//   var key;
//   for (var i = 0; i < localStorage.length; i++) {
//     key = localStorage.key(i);

//     if(key.substring(0,5) == 'note-') {
//       notes.push({
//         date: key.replace('note-',''),
//         content: localStorage.getItem(localStorage.key(i))
//       });
//     } 
//   }
//   return notes;
// }


// function deleteNote(dateTime) {
//   localStorage.removeItem('note-' + dateTime); 
// }


counter = function() {
    var value = $('#sptext').val();
    console.log(value);
    if (value.length == 0) {
        $('#wordCount').html(0+" words");
        return;
    }

    var regex = /\s+/gi;
    var wordCount = value.trim().replace(regex, ' ').split(' ').length;

    $('#wordCount').html(wordCount+" words");
      var x = document.getElementById("an_btn");
    if (x.style.display === "none") {
        x.style.display = "block";
    } 

    arr=value.split(" ");



};

