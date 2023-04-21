const router = require('express').Router();
const authRouters = require('./auth');
const userRouters = require('./users');
const movieRouters = require('./movies');
const auth = require('../middlewares/auth');

router.use('/', authRouters);
router.use(auth);
router.use('/', userRouters);
router.use('/', movieRouters);

module.exports = router;
