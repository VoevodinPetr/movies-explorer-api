const userRouters = require('express').Router();
const { updateUser, getUsers } = require('../controllers/users');
const { validationUpdateUser } = require('../utils/validation');

userRouters.get('/me', getUsers);
userRouters.patch('/me', validationUpdateUser, updateUser);

module.exports = userRouters;
