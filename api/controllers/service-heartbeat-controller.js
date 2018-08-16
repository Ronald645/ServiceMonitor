/**
 * ServiceHeartBeatController
 *
 * @description :: Process HeartBeat from service scripts
 */

"use strict";

const util = require('util');

module.exports = {
    friendlyName: 'Process HeartBeat from service scripts'
  , description: 'Process and save HeartBeat JSON requests from service scripts'
  , exits: {
        success: {
            description: 'HeartBeat properly processed'
          , responseType: 'jsonrequestdone'
        },

        fail: {
            description: 'HeartBeat failed to process'
          , responseType: 'jsonrequestfailed'
        }
    }

  , fn: function (inputs, exits) {
      //var testvar = 3; //ServiceStatus.findOne({ statusID: 3 });
      //testvar = ServiceStatus.findOne({ statusID: 3 });

      async function process(inputs, exits) {
        var request = this.req.body;

        //console.log(testvar);

        var hostdata = {};
        hostdata.CreatedHeartBeatAt         = request.CreatedHeartBeatAt;       /*remoteHostCreatedHeartBeatAt*/
        hostdata.HostName                   = request.HostName;                 /*remoteHostName*/
        hostdata.HostServiceName            = request.HostServiceName;          /*remoteHostServiceName*/
        hostdata.HostServiceStatus          = request.HostServiceStatus;        /*remoteHostServiceRawStatus*/
        hostdata.HostServiceStatusMessage   = request.HostServiceStatusMessage; /*remoteHostServiceStatusMessage*/

        for (var att in hostdata) {
          if (!testValueExists(hostdata[att])) {
            return exits.fail('Attribute ' + att + ' does not contain data');
          }
        }

        if (!verifyJavaEpochTime(hostdata.CreatedHeartBeatAt)) {
          return exits.fail('Attribute CreatedHeartBeatAt contains an invalid value');
        }

        if (!verifyJavaEpochTimeIsCurrent(hostdata.CreatedHeartBeatAt, sails.config.custom.remoteCreateTimeMaxOffsetInSeconds * 1000)) {
          return exits.fail('Attribute CreatedHeartBeatAt is off by more than ' + (sails.config.custom.remoteCreateTimeMaxOffsetInSeconds * 1000) + ' seconds');
        }

        var unknownstatus = await ServiceStatus.findOne({ statusID: 3 }); /* unknown */

        var heartbeat = await ServiceHeartBeat.create({
            remoteHostCreatedHeartBeatAt    : hostdata.CreatedHeartBeatAt
          , remoteHostName                  : hostdata.HostName
          , remoteHostServiceName           : hostdata.HostServiceName
          , remoteHostServiceRawStatus      : hostdata.HostServiceStatus
          , remoteHostServiceStatusMessage  : hostdata.HostServiceStatusMessage
          , status                          : unknownstatus.id
          , receivedFromAddress             : this.req.ip
        }).fetch();

        var status = await ServiceStatus.findOne({ statusName: hostdata.HostServiceStatus});

        if (status) {
          await ServiceHeartBeat.update( { id: heartbeat.id }).set({ status : status.id });
        }

        var host = await ServiceHost.findOne({
              hostName                      : hostdata.HostName
            , receivedFromAddress           : this.req.ip
        })

        if (!host) {
          host = await ServiceHost.create({
              hostName                      : hostdata.HostName
            , receivedFromAddress           : this.req.ip
          }).fetch();
        }

        await ServiceHost.update({ id: host.id }).set({ lastSeenAt : ((new Date()).getTime()) });

        var deadstatus = await ServiceStatus.findOne({ statusID: 5 });

        var session = await ServiceHeartBeatSession.findOne({
          where : {
              status                          : { '!=' : deadstatus.id }
            , remoteHostServiceName           : hostdata.HostServiceName
            , receivedFromAddress             : this.req.ip
            , host                            : host.id
          }
        });

        var publishasnew = session ? false : true;

        if (!session) {
          session = await ServiceHeartBeatSession.create({
              remoteHostServiceName           : hostdata.HostServiceName
            , receivedFromAddress             : this.req.ip
            , host                            : host.id
            , status                          : unknownstatus.id
          }).fetch();
        }

        await ServiceHeartBeatSession.update( { id: session.id } ).set({
            remoteHostServiceLastStatusMessage : hostdata.HostServiceStatusMessage
          , remoteHostName                     : hostdata.HostName
          , status                             : status.id
        });

        await ServiceHeartBeat.update( { id: heartbeat.id }).set({ session : session.id });

        // code located here, publish might not always complete =(, TODO FIX
        if (publishasnew) {
          //\node_modules\sails\lib\hooks\pubsub\index.js _introduce
          // Use addRoomMembersToRooms to subscribe everyone in the class room to the model identity instance room
          sails.sockets.addRoomMembersToRooms(ServiceHeartBeatSession._classRoom(), ServiceHeartBeatSession._room(session.id), () => {
            ServiceHeartBeatSession.publish([ session.id ], {
                verb: "created"
              , type: "nosailsblueprint"
              , data: session
              , id: session.id
            });
            //return this.res.send();
          });
        } else {
          ServiceHeartBeatSession.publish([ session.id ], {
              verb: "updated"
            , type: "nosailsblueprint"
            , data: session
            , id: session.id
          });
        }

        return exits.success();
      };

      return process;
    }()
};

function verifyJavaEpochTime(time) {
  var datetime = new Date(0);
  datetime.setUTCSeconds(time);
  if (isNaN(datetime.valueOf()) || datetime.valueOf() == 0) {
    return false;
  };

  return true;
}

function verifyJavaEpochTimeIsCurrent(time, maxoffsetinms) {
  if (verifyJavaEpochTime(time)) {
    var datetime = new Date(0);
    datetime.setUTCSeconds(time);

    var curdatetime = new Date();

    if (Math.abs(datetime - curdatetime) <= maxoffsetinms) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function testValueExists(value) {
  if (typeof value == 'string') {
    if (util.isString(value)) {
      if (value.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (typeof value == 'number') {
    if (util.isNumber(value)) {
      if (value != 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  throw Error ('Value type ' + (typeof value) + ' not supported by this function, please implement')
}
