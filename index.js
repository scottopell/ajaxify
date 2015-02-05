var app     = require('express')();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var phantom = require('phantom');

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('subscription', function(msg){
    var parts = msg.split('\t');
    var webpage = parts[0];
    var path = parts[1];
    console.log("got msg");
    phantomSubscription(webpage, path, function(msg){
      socket.emit('update', msg);
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

var phantomSubscription = function(webpage, path, callback){
  phantom.create(function (ph) {
    ph.createPage(function (page) {
      page.open(webpage, function (status) {
        console.log("opened page? ", status);
        page.evaluate(
            function (path) {
              return document.querySelector(path).innerHTML;
            },
            function (result) {
              callback(result);
              ph.exit();
            },
            path
          );
      });
    });
  });
};
