const NotFoundError = require('../errors/NotFoundError');
const { THE_REQUESTED_RESOURCE_IS_NOT_FOUND, UNKNOWN_ERROR, STATUS_CODES } = require('../utils/constants');

const SERVER_ERROR = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR ? UNKNOWN_ERROR : message,
  });
  next();
};

const NOT_FOUND_ERROR = (req, res, next) => {
  next(new NotFoundError(THE_REQUESTED_RESOURCE_IS_NOT_FOUND));
};

module.exports = {
  SERVER_ERROR,
  NOT_FOUND_ERROR,
};
