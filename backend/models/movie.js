const mongoose = require('mongoose');
const { validateUrl } = require('../validator/validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: validateUrl,
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: validateUrl,
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: validateUrl,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Поле должно быть заполнено'],
    },
    movieId: {
      type: Number,
      required: [true, 'Поле должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
