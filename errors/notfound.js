const CODE_STATUSES = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_STATUSES.notFound;
  }
}

module.exports = NotFoundError;
