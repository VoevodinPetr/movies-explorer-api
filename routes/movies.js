const movieRouters = require('express').Router();

const { validationCreateMovies, validationDeleteMovie } = require('../utils/validation');

const {
  createMovies,
  getMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouters.get('/movies', getMovie);
movieRouters.post('/movies', validationCreateMovies, createMovies);
movieRouters.delete('/movies/:_id', validationDeleteMovie, deleteMovie);

module.exports = movieRouters;
