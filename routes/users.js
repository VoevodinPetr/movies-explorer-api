const userRouters = require('express').Router();
const { updateUser, getUsers } = require('../controllers/users');
const { validationUpdateUser } = require('../utils/validation');

userRouters.get('/users/me', getUsers);
userRouters.patch('/users/me', validationUpdateUser, updateUser);

module.exports = userRouters;
