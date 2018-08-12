$(document).ready(function() {
  io.socket.get('/serviceheartbeatsession', function(resData) {
    console.log(resData.length);
  });

  io.socket.on('serviceheartbeatsession', function(resData) {
    console.log(Date() + ': ' + resData.verb);
  });

  io.socket.on('disconnect', function onDisconnect(){
    alert('We lost the connection to the Node JS server, please refresh the page.');
  });
});
