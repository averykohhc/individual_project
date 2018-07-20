
//var api = require("./../../config/api.js");
var botui = new BotUI('api-bot');
var mic = false;
var response;

var socket = io.connect(window.location.href);
console.log("hostname is " + window.location.href);
//var socket = io.connect('http://localhost:3000');
//var socket = io.connect('https://lawyerbot3.herokuapp.com/');
//var socket = io();
// read the BotUI docs : https://docs.botui.org/

//api.greet();

// socket.on('fromServer', function (data) { // recieveing a reply from server.
//        console.log(data.server);
//        newMessage(data.server);
//       addAction();
//     })

botui.message.add({
  content: 'Hello! My name is LAWrence. What\'s yours?',
  delay: 200,
}).then(function () {
  addAction();
}).then(function () {
    socket.on('fromServer', function (data) { // recieveing a reply from server.
      console.log(data.server);
      newMessage(data.server);
      addAction();
  })
})


function asrTranscription(input) {
  botui.action.text({
    action: {
      placeholder: input,
    }
  })
}

function finalAsrTrancription(input) {
  mic = true;
  console.log("mic set to " + mic);


  if (input == null || input.length === 0) {
    console.log("voice input is empty");
    mic = false;
    console.log("mic set to " + mic);
    // botui.action.text({
    //   action: {
    //     placeholder: "Please speak again voice input was empty",
    //   }
    // })
    addAction();
    return;
  }
  else {
    botui.action.text({
      action: {
        placeholder: input,
      }
    })
  }

  botui.message.add({ // show a message
    human: true,
    content: input,
  }).then(function (res) {
    socket.emit('fromClient', { client : input.toString() });
    console.log('Asrtranscript: ', input.toString() );
    console.log("bottom " + typeof(input));
    console.log("bottom " + input.toString());
  })


}

function newMessage (response) {
  botui.message.add({
    content: response,
    delay: 0,
  })
}


botui.action.text({
  action: {
    placeholder: 'Enter your text here'
  }
}).then(function (res) { // will be called when it is submitted.
  console.log(res.value); // will print whatever was typed in the field.
});


function addAction () {

  if (mic == false) {
    botui.action.text({
    action: {
      placeholder: 'enter response...',
    }
  }).then(function (res) {
  //  console.log ("res is " + res);
    socket.emit('fromClient', { client : res.value });
    console.log('client response: ', res.value);
  })
  }
  else if (mic == true){
    botui.action.text({
      action: {
        placeholder: 'enter response...',
      }
    })
      mic = false;
      console.log("mic set to " + mic);
      addAction();

  }

}
