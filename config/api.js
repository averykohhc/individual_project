var apiai = require('apiai');
var handler = require('./handler.js');

// api.ai docs : https://api.ai/docs/
// API Key
var app = apiai('422dab475d6247d6bb4d87ae58c523f2');

//to get first greeting
// var util = require('util');
//
// var event = {
//   name: "greetings",
//   data: {}
// };
//
// var options = {
//     sessionId: '<UNIQUE SESSION ID>'
// };
//
// var request = app.eventRequest(event, options);
//
// request.on('response', function(response) {
//     //console.log("first greeting is " + util.inspect(response, false, null));
//     console.log(response);
//     var greet = response.result.fulfillment.speech;
//
// });
//
// request.on('error', function(error) {
//     console.log(error);
// });
//
// request.end();

const uuidv4 = require('uuid/v4');

var session= uuidv4();

console.log("session is " + session);

// Function which returns speech from api.ai
var getRes = function(query) {
  var request = app.textRequest(query, {
      sessionId: session
  });
const responseFromAPI = new Promise(
        function (resolve, reject) {
request.on('error', function(error) {
    console.log(error);
    reject(error);
});
request.on('response', function(response) {
  //console.log(response);
  handler.show(response);
  handler.logClientInput(response);
  resolve(response.result.fulfillment.speech);
});
});
request.end();
//console.log("response from api" + responseFromAPI);
return responseFromAPI;
};

// test the command :
//getRes('hello').then(function(res){console.log(res)});

module.exports = {getRes}
