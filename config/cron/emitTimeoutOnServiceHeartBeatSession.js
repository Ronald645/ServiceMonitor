module.exports.fn = async function emitTimeoutOnServiceHeartBeatSession() {
  var relevantstatus = await ServiceStatus.find({ statusID: { nin: [5 /*dead*/] }});
  var timeoutstatus = await ServiceStatus.findOne({ statusID: 4 /*timeout*/ });
  var livesessions = await ServiceHeartBeatSession.find({
      status: { in: _.pluck(relevantstatus, 'id') }
    , averageHeartBeatIntervalInSeconds : { '>' : 0 }
  }).populate('heartbeats', {
      limit: 1
    , sort: 'createdAt DESC'
  });

  var livesession = null;
  var lastheartbeats = null;
  var date = Date.now();

  for (var idx = 0; idx < livesessions.length; idx++) {
    livesession = livesessions[idx];
    lastheartbeat = livesession.heartbeats[0];

    if ((date - lastheartbeat.createdAt) - (livesession.averageHeartBeatIntervalInSeconds * 1000 * 1.5) > 0) {
      await ServiceHeartBeat.create({
          //remoteHostCreatedHeartBeatAt    : date
          remoteHostName                  : livesession.remoteHostName
        , remoteHostServiceName           : livesession.remoteHostServiceName
        , remoteHostServiceRawStatus      : timeoutstatus.statusName
        , remoteHostServiceStatusMessage  : livesession.remoteHostServiceLastStatusMessage
        , status                          : timeoutstatus.id
        //, receivedFromAddress             : null
        , session                         : livesession.id
      }); //.fetch();

      await ServiceHeartBeatSession.update( { id: livesession.id } ).set({
          status                          : timeoutstatus.id
      });

      await ServiceHeartBeatSession.publish([ livesession.id ], { "verb": "timeout" });
    }
  }
};
