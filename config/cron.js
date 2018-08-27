const emitTimeoutOnServiceHeartBeatSession = require('./cron/emitTimeoutOnServiceHeartBeatSession');
const setAverageIntervalOnServiceHeartBeatSession = require('./cron/setAverageIntervalOnServiceHeartBeatSession')
const environmentconfig = require ('./environmentconfig.js');

module.exports.cron = {};

if (environmentconfig.backends.length == 0 || environmentconfig.backends.indexOf('timeoutheartbeat') > -1) {
  module.exports.cron['setTimeoutOnServiceHeartBeatSession'] = {
    schedule: '0 5-59/10 * * * *',
    onTick: setAverageIntervalOnServiceHeartBeatSession.fn
  },

  module.exports.cron['emitTimeoutOnServiceHeartBeatSession'] = {
    schedule: '0 10-59/10 * * * *',
    onTick: emitTimeoutOnServiceHeartBeatSession.fn
  }
} else {
  console.log(' - Disabling: `timeoutheartbeat` functionality');
};

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
//};
