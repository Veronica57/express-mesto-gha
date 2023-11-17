const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const JWT_SECRET = 'secret-key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError('Authorization is required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Authorization is required'));
    return;
  }
  req.user = payload;
  next();
};
