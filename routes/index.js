const router = require('express').Router();
const { ERROR_MESSAGES } = require('../utils/constants');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFound = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const {
  validationCreateUser,
  validationLogin,
} = require('../utils/validations');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use((req, res, next) => {
  next(new NotFound(ERROR_MESSAGES.REQUESTED_PAGE_NOT_FOUND));
});

module.exports = router;
