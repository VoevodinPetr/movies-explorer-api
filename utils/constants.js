const STATUS_CODES = {
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  AAuthorizationRequired: 401,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const USER_CONFLIC = 'Пользователь с таким email уже существует';
const INCORRECT_DATA_ENTERED = 'Введены некоректные данные';
const DATA_PROCESSING_ERROR = 'Ошибка обработки данных';
const MOVIE_NOT_FOUND = 'Фильм не найден';
const FORBIDDEN_DELETE_MOVIE_USER = 'Запрещено удалять фильм друго пользователя';
const INVALID_MOVIE_ID = 'Некорректный _id фильма';
const USER_NOT_FOUND = 'Пользователь не найден';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const INCORRECT_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
const THE_REQUESTED_RESOURCE_IS_NOT_FOUND = 'Запрашиваемый ресурс не найден';
const UNKNOWN_ERROR = 'На сервере произошла ошибка';

module.exports = {
  USER_CONFLIC,
  INCORRECT_DATA_ENTERED,
  DATA_PROCESSING_ERROR,
  MOVIE_NOT_FOUND,
  FORBIDDEN_DELETE_MOVIE_USER,
  INVALID_MOVIE_ID,
  USER_NOT_FOUND,
  AUTHORIZATION_REQUIRED,
  INCORRECT_EMAIL_OR_PASSWORD,
  THE_REQUESTED_RESOURCE_IS_NOT_FOUND,
  UNKNOWN_ERROR,
  STATUS_CODES,
};

module.exports.REGEX = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
