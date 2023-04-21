const mongoose = require('mongoose');
const validator = require('validator');

const movieScheme = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      validate: { validator: validator.isURL },
      required: true,
    },
    trailerLink: {
      type: String,
      validate: { validator: validator.isURL },
      required: true,
    },
    thumbnail: {
      type: String,
      validate: { validator: validator.isURL },
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieScheme);
