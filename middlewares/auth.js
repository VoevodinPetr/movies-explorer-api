const { SECRET_KEY_JWT, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const AuthorizationRequired = require('../errors/AuthorizationRequired');
const { AUTHORIZATION_REQUIRED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationRequired(AUTHORIZATION_REQUIRED));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY_JWT : 'dev-secret');
  } catch (err) {
    next(new AuthorizationRequired(AUTHORIZATION_REQUIRED));
    return;
  }

  req.user = payload;
  next();
};
