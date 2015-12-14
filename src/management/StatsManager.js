var RestClient = require('rest-facade').Client;
var ArgumentError = require('../exceptions').ArgumentError;


/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */


/**
 * @class
 * Abstracts interaction with the stats endpoint.
 * @constructor
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 */
var StatsManager = function (options){
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  var clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * [Stats endpoint]{@link https://auth0.com/docs/api/v2#!/Stats}.
   *
   * @type {external:RestClient}
   */
  this.stats = new RestClient(options.baseUrl + '/stats/:type', clientOptions);
};


/**
 * Get the daily stats.
 *
 * @method    getDaily
 * @memberOf  StatsManager
 *
 * @param   {Object}    params        Stats parameters.
 * @param   {String}    params.from   The first day in YYYYMMDD format.
 * @param   {String}    params.to     The last day in YYYYMMDD format.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
StatsManager.prototype.getDaily = function (params, cb) {
  params = params || {};
  params.type = 'daily';

  if (cb && cb instanceof Function) {
    return this.stats.get(params, cb);
  }

  return this.stats.get(params);
};


/**
 * Get a the active users count.
 *
 * @method    getActiveUsersCount
 * @memberOf  StatsManager
 *
 * @param   {Function}  [cb]  Callback function.
 *
 * @return  {Promise|undefined}
 */
StatsManager.prototype.getActiveUsersCount = function (cb) {
  var options = { type: 'active-users' };

  if (cb && cb instanceof Function) {
    return this.stats.get(options, cb);
  }

  // Return a promise.
  return this.stats.get(options);
};


module.exports = StatsManager;