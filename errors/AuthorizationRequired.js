const { STATUS_CODES } = require('../utils/constants');

class AuthorizationRequired extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.AAuthorizationRequired;
  }
}

module.exports = AuthorizationRequired;
