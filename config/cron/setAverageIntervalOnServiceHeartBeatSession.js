module.exports.fn = async function setAverageIntervalOnServiceHeartBeatSession() {
  var relevantstatus = await ServiceStatus.find({ statusID: { nin: [4 /*timeout*/, 5 /*dead*/] }});
  var livesessions = await ServiceHeartBeatSession.find({
    status: { in: _.pluck(relevantstatus, 'id') }
  }).populate('heartbeats', {
     where: {
       status: { in: _.pluck(relevantstatus, 'id') }
     }
    , limit: 5
    , sort: 'createdAt DESC'
  });

  var livesession = null;
  var heartbeats = null;
  var heartbeatsordered = null;
  var startcreate = null;
  var interval = [0, 0, 0, 0];
  var average = 0;

  const avg = (s, c, i, a) => s = s + (c / a.length);

  for (var idx = 0; idx < livesessions.length; idx++) {
    livesession = livesessions[idx];
    heartbeats = livesession.heartbeats;
    lastinterval = 0;

    if (livesession.heartbeats.length < 5) {
      continue;
    } else {
      heartbeatsordered = _.sortByOrder(livesession.heartbeats, ['createdAt'], ['desc'])

      for (var idx2 = 0; idx2 < heartbeatsordered.length; idx2++) {
        if (idx2 == 0) {
          lastinterval = heartbeatsordered[idx2].createdAt;
        };

        if (idx2 > 0) {
          interval[idx2 - 1] = lastinterval - heartbeatsordered[idx2].createdAt;
          lastinterval = heartbeatsordered[idx2].createdAt;
        };
      };

      average = interval.reduce(avg, 0)

      await ServiceHeartBeatSession.update( { id: livesession.id } ).set({
          averageHeartBeatIntervalInSeconds  : average / 1000
      });
    };
  };
};
