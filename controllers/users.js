const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_LENGTH } = require('../utils/configDefault');
const NotFound = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');
const { ERROR_MESSAGES } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  const { userId } = req.user._id;
  return User.findById(userId)
    .orFail(new NotFound(ERROR_MESSAGES.USER_NOT_FOUND))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(ERROR_MESSAGES.DATA_PROCESSING_ERROR));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  return bcrypt.hash(password, SALT_LENGTH)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      });
    })
    .then((user) => res.status(200).send({
      name: user.name, email: user.email, _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(ERROR_MESSAGES.DATA_PROCESSING_ERROR));
        return;
      } if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.USER_CONFLICT));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  ).orFail(new NotFound(ERROR_MESSAGES.USER_NOT_FOUND))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.USER_CONFLICT));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
