/**
 * ServiceHeartBeat.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    remoteHostCreatedHeartBeatAt: {
        type: 'Number'
      , description: 'A JS Timestamp (epoch) representing the time on the remote host when this HeartBeat was created'
      , example: 1502844074211
    },

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

    remoteHostServiceRawStatus: {
        type: 'String'
      , description: 'Stores the raw status indication'
      , example: 'unknown'
    },

    remoteHostServiceStatusMessage: {
        type: 'String'
      , description: 'A message detailing the status of the service'
      , example: 'Failed because //hbm-wts01/Data Files/Axerrio/EKT/In is not available'
    },

    receivedFromAddress: {
        type: 'String'
      , description: 'Message received from address'
      , example: '88.123.54.33'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    session: {
      model: 'ServiceHeartBeatSession'
    },

    status: {
      model: 'ServiceStatus'
    }
  },
};
