const movieRouters = require('express').Router();

const { validationCreateMovies, validationDeleteMovie } = require('../utils/validation');

const {
  createMovies,
  getMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouters.get('/', getMovie);
movieRouters.post('/', validationCreateMovies, createMovies);
movieRouters.delete('/:_id', validationDeleteMovie, deleteMovie);

module.exports = movieRouters;
