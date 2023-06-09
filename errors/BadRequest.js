const { STATUS_CODES } = require('../utils/constants');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequest;
