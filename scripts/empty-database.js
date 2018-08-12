console.log('START');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ServiceMonitor;"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ServiceMonitor");

  dbo.collection("serviceheartbeat").remove({ }, function (err, obj) {
    console.log('serviceheartbeat');
    if (err) throw err;
    dbo.collection("serviceheartbeatsession").remove({ }, function (err, obj) {
      console.log('serviceheartbeatsession');
      if (err) throw err;
      dbo.collection("servicehost").remove({ }, function (err, obj) {
        console.log('servicehost');
        if (err) throw err;
        dbo.close();
      });
    });
  });
});
