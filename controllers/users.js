const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const { USER_NOT_FOUND, DATA_PROCESSING_ERROR, USER_CONFLIC } = require('../utils/constants');

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    )
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(DATA_PROCESSING_ERROR));
      } else if (err.codeName === 'DuplicateKey') {
        next(new Conflict(USER_CONFLIC));
        return;
      }
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(DATA_PROCESSING_ERROR));
        return;
      }
      next(err);
    });
};
