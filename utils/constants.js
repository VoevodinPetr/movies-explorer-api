const STATUS_CODES = {
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  AUTH: 401,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'Пользователь не найден',
  DATA_PROCESSING_ERROR: 'Ошибка обработки данных',
  USER_CONFLICT: 'Пользователь с таким email уже существует',
  MOVIE_NOT_FOUND: 'Фильм не найден',
  FORBIDDEN_DELETE_MOVIE_USER: 'Запрещено удалять фильм жруго пользователя',
  INVALID_MOVIE_ID: 'Некорректный _id фильма',
  REQUESTED_PAGE_NOT_FOUND: 'Запрашиваемый страница не найдена',
  UNKNOWN_ERROR: 'Что-то пошло не так',
  AUTHORIZATION_REQUIRED: 'Необходима авторизация',
  INCORRECT_EMAIL_OR_PASSWORD: 'Неправильная почта или пароль',
};

module.exports = {
  ERROR_MESSAGES,
  STATUS_CODES,
};
