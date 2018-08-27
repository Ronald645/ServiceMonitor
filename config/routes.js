/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {};

const environmentconfig = require ('./environmentconfig.js');

var routes = module.exports.routes;

if (environmentconfig.backends.length == 0 || environmentconfig.backends.indexOf('dashboard') > -1) {
  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  routes['GET /'] =                     { action: 'view-homepage-or-redirect' }
  routes['GET /welcome'] =              { action: 'dashboard/view-welcome' }

  routes['GET /faq'] =                 { view:   'pages/faq' }
  routes['GET /legal/terms'] =         { view:   'pages/legal/terms' }
  routes['GET /legal/privacy'] =       { view:   'pages/legal/privacy' }
  routes['GET /contact'] =             { view:   'pages/contact' }

  /*
  routes['GET /signup'] =              { action: 'entrance/view-signup' }
  routes['GET /email/confirm'] =       { action: 'entrance/confirm-email' }
  routes['GET /email/confirmed'] =     { view:   'pages/entrance/confirmed-email' }
  */
  routes['GET /login'] =               { action: 'entrance/view-login' }

  /*
  routes['GET /password/forgot'] =     { action: 'entrance/view-forgot-password' }
  routes['GET /password/new'] =        { action: 'entrance/view-new-password' }
  */

  routes['GET /account'] =             { action: 'account/view-account-overview' }
  routes['GET /account/password'] =    { action: 'account/view-edit-password' }
  routes['GET /account/profile'] =     { action: 'account/view-edit-profile' }

  routes['GET /tabledashboard'] =                 { action:   'table-dashboard-controller' }

  // //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  // //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  // //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // // from the CloudSDK library.

  routes['/api/v1/account/logout'] =                            { action: 'account/logout' }
  routes['PUT   /api/v1/account/update-password'] =             { action: 'account/update-password' }
  routes['PUT   /api/v1/account/update-profile'] =              { action: 'account/update-profile' }
  //routes['PUT   /api/v1/account/update-billing-card'] =         { action: 'account/update-billing-card' }
  routes['PUT   /api/v1/entrance/login'] =                         { action: 'entrance/login' }

  /*
  routes['POST  /api/v1/entrance/signup'] =                        { action: 'entrance/signup' }
  routes['POST  /api/v1/entrance/send-password-recovery-email'] =  { action: 'entrance/send-password-recovery-email' }
  routes['POST  /api/v1/entrance/update-password-and-login'] =     { action: 'entrance/update-password-and-login' }
  routes['POST  /api/v1/deliver-contact-form-message'] =           { action: 'deliver-contact-form-message' }
  */

  routes['GET /servicestatus'] =                                 { action: 'ServiceStatus/find' }
  routes['GET /serviceheartbeatsession'] =                       { action: 'ServiceHeartBeatSession/find' }
  routes['PATCH /serviceheartbeatsession/:id'] =                 { action: 'ServiceHeartBeatSession/update' }

  // //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  // //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  // //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝

  // //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  // //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  // //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝
  routes['/terms'] =                    '/legal/terms'
  routes['/logout'] =                   '/api/v1/account/logout'
} else {
  console.log(' - Disabling: `dashboard` functionality');
}

if (environmentconfig.backends.length == 0 || environmentconfig.backends.indexOf('heartbeatreceiver') > -1) {
  routes['POST  /api/v1/serviceheartbeatcontroller'] =           { action: 'service-heartbeat-controller', csrf: false }
} else {
  console.log(' - Disabling: `heartbeatreceiver` functionality');
};
