const authRouters = require('express').Router();
const { validationCreateUser, validationLogin } = require('../utils/validation');

const { createUser, login } = require('../controllers/auth');

authRouters.post('/signup', validationCreateUser, createUser);
authRouters.post('/signin', validationLogin, login);

module.exports = authRouters;
