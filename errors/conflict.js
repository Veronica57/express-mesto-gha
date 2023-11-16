const CODE_STATUSES = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_STATUSES.conflict;
  }
}

module.exports = ConflictError;
