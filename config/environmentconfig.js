module.exports.backends = [];

if (process.env.node_frontend) {
  module.exports.backends = process.env.node_frontend.split(',');
}

if (!process.env.environmentconfigfirstload) {
  process.env.environmentconfigfirstload = 1; // TODO: possibly racy, need a better method for this

  if (process.env.node_frontend) {
    console.log('\n');
    console.log('SERVICEMONITOR: NODE_FRONTEND set to `' + process.env.node_frontend + '` will split by `,`');
    console.log('SERVICEMONITOR: Parsed the environment variable NODE_FRONTEND to ' + module.exports.backends.length + ' frontends');
    for (var idx = 0; idx < module.exports.backends.length; idx++) {
      console.log(' - Enabling: `' + module.exports.backends[idx] + '` functionality');
    }
  } else {
    console.log('SERVICEMONITOR: NODE_FRONTEND not set, enabling all functionality');
    console.log(' - Enabling: dashboard functionality');
    console.log(' - Enabling: heartbeatreceiver functionality');
    console.log(' - Enabling: timeoutheartbeat functionality');
  }
}
