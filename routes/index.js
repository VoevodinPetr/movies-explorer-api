const router = require('express').Router();
const authRouters = require('./auth');
const userRouters = require('./users');
const movieRouters = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { THE_REQUESTED_RESOURCE_IS_NOT_FOUND } = require('../utils/constants');

router.use('/', authRouters);
router.use(auth);
router.use('/', userRouters);
router.use('/', movieRouters);

router.use('*', (req, res, next) => {
  next(new NotFoundError(THE_REQUESTED_RESOURCE_IS_NOT_FOUND));
});

module.exports = router;
