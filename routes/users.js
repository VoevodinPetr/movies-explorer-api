const userRouters = require('express').Router();
const { updateUser, getUser } = require('../controllers/users');
const { validationUpdateUser } = require('../utils/validation');

userRouters.get('/users/me', getUser);
userRouters.patch('/users/me', validationUpdateUser, updateUser);

module.exports = userRouters;
