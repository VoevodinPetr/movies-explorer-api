const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');
const {
  DATA_PROCESSING_ERROR,
  MOVIE_NOT_FOUND,
  FORBIDDEN_DELETE_MOVIE_USER,
  INVALID_MOVIE_ID,
} = require('../utils/constants');

module.exports.createMovies = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(DATA_PROCESSING_ERROR));
        return;
      }
      next(err);
    });
};

module.exports.getMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      } else if (!movie.owner.equals(req.user._id)) {
        throw new Forbidden(FORBIDDEN_DELETE_MOVIE_USER);
      }
      Movie.deleteOne(movie).then(() => res.status(200).send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(INVALID_MOVIE_ID));
        return;
      }
      next(err);
    });
};
