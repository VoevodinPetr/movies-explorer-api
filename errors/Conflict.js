const { STATUS_CODES } = require('../utils/constants');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.CONFLICT;
  }
}

module.exports = Conflict;
