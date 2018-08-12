/**
 * requestdone.js
 *
 * A custom response for completed JSON requests
 *
 */
module.exports = function requestdone() {

  var req = this.req;
  var res = this.res;

  return res.status(200).send('OK');
};
