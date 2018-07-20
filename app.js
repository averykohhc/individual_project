var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const socketIO = require('socket.io');
var api = require('./config/api');
var morgan = require('morgan');
//var api = require('./public/javascripts/api');
var http = require('http');
var index = require('./routes/index');
var PORT = process.env.PORT || 8010;
//var socket = require('./config/sock');
//const index = path.join(__dirname, 'index.html');

var app = express();
var server = http.createServer(app)
server.listen(PORT, function () {
  console.log('Express server listening on port ', PORT)
})

//app.use(morgan('dev'));


//console.log("port is " + PORT);
//app.use((req, res) => res.sendFile(index) )
//app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var username ='username';

// app.get('/', function(req, res){
//    res.cookie('user', username, {maxAge: 10800}).send('cookie set');
// });



const io = socketIO.listen(server);

io.on('connection', function (socket) {
  socket.on('fromClient', function (data) {
    console.log("data client is " + data.client);
         api.getRes(data.client).then(function(res){
           console.log('response', res);
            socket.emit('fromServer', { server: res });
         });
  });
});



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//console.log('Server Started at Port 3000');
app.use('/', index);
//socket.conn();
//socket.fromClient();

app.use('/', function(req, res) {
  console.log(req.cookies);
});

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
