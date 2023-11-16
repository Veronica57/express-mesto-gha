const CODE_STATUSES = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_STATUSES.unauthorized;
  }
}

module.exports = UnauthorizedError;
