/**
 * ServiceHeartBeatSession.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    remoteHostName: {
        type: 'String'
      , description: 'The name of the remote host'
      , example: 'HOL-WTS03'
    },

    remoteHostServiceName: {
        type: 'String'
      , description: 'The name of the service on the remote host'
      , example: 'Axerrio e-Trade client'
    },

    remoteHostServiceLastStatusMessage: {
        type: 'String'
      , description: 'The last message detailing the status of the service'
      , example: 'Ok'
    },

    receivedFromAddress: {
        type: 'String'
      , description: 'Message received from address'
      , example: '88.123.54.33'
    },

    averageHeartBeatIntervalInSeconds: {
        type: 'Number'
      , description: 'Moving average of heartbeat delays, used to detect dead sessions'
      , example: 10
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    heartbeats: {
        via: 'session'
      , collection: 'ServiceHeartBeat'
    },

    host: {
      model: 'ServiceHost'
    },

    status: {
      model: 'ServiceStatus'
    }
  },

};
