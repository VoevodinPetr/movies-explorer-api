const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { ERROR_MESSAGES } = require('../utils/constants');

module.exports.getMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId }).populate('owner')
    .then((movie) => {
      res.status(200).send({ movie });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  const ownerId = req.user._id;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: ownerId,
  }).populate('owner')
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(ERROR_MESSAGES.DATA_PROCESSING_ERROR));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { Id } = req.params;
  Movie.findById(Id).populate('owner')
    .then((movie) => {
      if (!movie) {
        next(new NotFound(ERROR_MESSAGES.MOVIE_NOT_FOUND));
      } else if (!movie.owner.equals(req.user._id)) {
        next(new ForbiddenError(ERROR_MESSAGES.FORBIDDEN_DELETE_MOVIE_USER));
      }
      return movie.remove().then(() => res.status(200).send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(ERROR_MESSAGES.INVALID_MOVIE_ID));
        return;
      }
      next(err);
    });
};
