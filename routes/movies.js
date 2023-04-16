const router = require('express').Router();

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validationCreateMovies, validationDeleteMovies } = require('../utils/validations');

router.get('/movies', getMovie);
router.post('/movies', validationCreateMovies, createMovie);
router.delete('/movies/:_id', validationDeleteMovies, deleteMovie);

module.exports = router;
