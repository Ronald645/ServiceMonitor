emitTimeoutOnServiceHeartBeatSession = require('./cron/emitTimeoutOnServiceHeartBeatSession');
setAverageIntervalOnServiceHeartBeatSession = require('./cron/setAverageIntervalOnServiceHeartBeatSession')

module.exports.cron = {
  setTimeoutOnServiceHeartBeatSession: {
    schedule: '0 5-59/10 * * * *',
    onTick: setAverageIntervalOnServiceHeartBeatSession.fn
  },

  emitTimeoutOnServiceHeartBeatSession: {
    schedule: '0 10-59/10 * * * *',
    onTick: emitTimeoutOnServiceHeartBeatSession.fn
  },

  //secondJob: {
  //  schedule: '*/5 * * * * *',
  //  onTick: function() {
  //    console.log('I am triggering every five seconds');
  //  }
  //}

  /*
  var statusid = [1, 2, 3, 4, 5];
  var statusname = ["Ok", "Error", "Unknown", "Timeout", "Dead"];

  session = await ServiceHeartBeatSession.create({
      remoteHostServiceName           : hostdata.HostServiceName
    , receivedFromAddress             : this.req.ip
    , host                            : host.id
    , status                          : unknownstatus.id
  }).fetch();

  await ServiceHeartBeat.update( { id: heartbeat.id }).set({ session : session.id });

  var deadstatus = await ServiceStatus.findOne({ statusID: 5 });
  */
};
