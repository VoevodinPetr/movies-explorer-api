const { SECRET_KEY_JWT, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/user');
const { SALT_LENGTH } = require('../utils/configDefault');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

const { USER_CONFLIC, INCORRECT_DATA_ENTERED } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  Auth.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(USER_CONFLIC);
      }
      return bcrypt.hash(password, SALT_LENGTH);
    })
    .then((hash) => Auth.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(INCORRECT_DATA_ENTERED));
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
