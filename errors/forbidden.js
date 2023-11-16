const CODE_STATUSES = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_STATUSES.forbidden;
  }
}

module.exports = ForbiddenError;
