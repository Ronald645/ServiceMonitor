var statuses;
var deadstatus;

var sessions;

$(document).ready(function() {
  console.log('_csrf token: ' + SAILS_LOCALS._csrf);

  io.socket.get('/servicestatus', function(resData) {
    statuses = resData;

    for (var idx = 0; idx < statuses.length; idx++) {
      if (statuses[idx].statusID === 5) {
        deadstatus = statuses[idx];
      }
    };

    console.log('deadstatus: ' + deadstatus);

    io.socket.get('/serviceheartbeatsession', { status : { '!=' : deadstatus._id }}, function(resData) {
      sessions = resData;
      console.log(sessions.length);

      io.socket.get('/serviceheartbeatsession', function(resData) {
        sessions = resData;
        console.log(sessions.length);
      });

      io.socket.on('serviceheartbeatsession', function(resData) {
        console.log(Date() + ': ' + resData.verb);
      });
    });
  });

  io.socket.on('disconnect', function onDisconnect(){
    alert('We lost the connection to the Node JS server, please refresh the page.');
  });

  io.socket.put('/serviceheartbeatsession/5b6f080a86019985d4009acb?_csrf='+encodeURIComponent(SAILS_LOCALS._csrf)
    , { remoteHostName : "TESTFROMREMOTE!@!@" }
    , (resData, jwr) => {
      console.log(resData);
      console.log(jwr);
    });
});
