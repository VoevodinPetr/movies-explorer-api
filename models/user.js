const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationRequired = require('../errors/AuthorizationRequired');
const { INCORRECT_EMAIL_OR_PASSWORD } = require('../utils/constants');

const userschema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
      },
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    versionKey: false,
  },
);

userschema.statics.findUserByCredentials = function Login(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationRequired(INCORRECT_EMAIL_OR_PASSWORD));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationRequired(INCORRECT_EMAIL_OR_PASSWORD));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('users', userschema);
