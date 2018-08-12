/**
 * custom hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineCustomHook(sails) {

  return {

    routes: {

      /**
       * Runs before every matching route.
       *
       * @param {Ref} req
       * @param {Ref} res
       * @param {Function} next
       */
      before: {
        'GET /*': {
          skipAssets: true,
          fn: async function(req, res, next){

            return next(); // disable for now

            if (req.session.history === undefined) {
              req.session.history = [];
            };

            req.session.history.push(req.url);

            return next();
          }
        }
      }
    }


  };

};
