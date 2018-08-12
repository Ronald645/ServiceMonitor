module.exports = {


  friendlyName: 'View table dashboard page',


  description: 'Display the table dashboard page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/tabledashboard',
      description: 'Display the table dashboard page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
