var RestClient = require('rest-facade').Client;
var ArgumentError = require('../exceptions').ArgumentError;
var utils = require('../utils');

var ResourceServersManager = function (options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  var clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for consuming the
   * {@link https://auth0.com/docs/api/v2#!/Client_Grants Auth0 Client Grantss endpoint}.
   *
   * @type {external:RestClient}
   */
  this.resource = new RestClient(options.baseUrl + '/resource-servers/:id', clientOptions);
};

utils.wrapPropertyMethod(ResourceServersManager, 'getAll', 'resource.getAll');
utils.wrapPropertyMethod(ResourceServersManager, 'create', 'resource.create');
utils.wrapPropertyMethod(ResourceServersManager, 'get', 'resource.get');
utils.wrapPropertyMethod(ResourceServersManager, 'update', 'resource.patch');
utils.wrapPropertyMethod(ResourceServersManager, 'delete', 'resource.delete');

module.exports = ResourceServersManager;
