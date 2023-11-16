const CODE_STATUSES = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_STATUSES.badRequest;
  }
}

module.exports = BadRequestError;
