const CODE_STATUSES = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(CODE_STATUSES.internalServerError).send({ message: 'Internal Server Error' });
  }
  next();
};
