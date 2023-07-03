const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 minute
  max: 1000, // limit each IP to 2 requests per windowMs
});

module.exports = {
  apiLimiter,
};
