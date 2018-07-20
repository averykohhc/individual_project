var apiai = require('apiai');
//var handler = require('./handler.js');

// api.ai docs : https://api.ai/docs/
// API Key
var app = apiai('72c959d551c74553b5022ede1efc47d2');

var util = require('util');

  var event = {
    name: "greetings",
    data: {}
  };

  var options = {
      sessionId: '<UNIQUE SESSION ID>'
  };

  var request = app.eventRequest(event, options);

  request.on('response', function(response) {
      //console.log("first greeting is " + util.inspect(response, false, null));
      console.log(response);
      var greet = response.result.fulfillment.speech;
      botui.message.add({
        content: greet,
        delay: 0,
      })

  });

  request.on('error', function(error) {
      console.log(error);
  });

  request.end();
