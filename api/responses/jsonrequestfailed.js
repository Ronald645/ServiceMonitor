/**
 * requestdone.js
 *
 * A custom response for completed JSON requests
 *
 */
module.exports = function requestfailed(error) {

  var req = this.req;
  var res = this.res;

  return res.status(500).send('Error: ' + error);
};
