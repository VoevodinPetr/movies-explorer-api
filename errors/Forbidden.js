const { STATUS_CODES } = require('../utils/constants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
}

module.exports = Forbidden;
