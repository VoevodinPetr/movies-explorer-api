const { SECRET_KEY_JWT, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/user');
const { SALT_LENGTH } = require('../utils/configDefault');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

const { USER_CONFLIC, INCORRECT_DATA_ENTERED } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, SALT_LENGTH)

    .then((hash) => Auth.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(INCORRECT_DATA_ENTERED));
        return;
      } if (err.code === 11000) {
        next(new Conflict(USER_CONFLIC));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return Auth.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY_JWT : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
