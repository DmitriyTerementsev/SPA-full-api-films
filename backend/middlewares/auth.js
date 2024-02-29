const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnathorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
