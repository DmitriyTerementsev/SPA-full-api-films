const routerMovies = require('express').Router();
const {
  getMovies, createMovie, deleteMovieById, likeMovie, dislikeMovie,
} = require('../controllers/movie');
const {
  validateMovie, validateMovieId,
} = require('../validator/validator');

routerMovies.get('/', getMovies);
routerMovies.post('/', validateMovie, createMovie);
routerMovies.delete('/_id', validateMovieId, deleteMovieById);
routerMovies.put('/_id/likes', validateMovieId, likeMovie);
routerMovies.delete('/_id/likes', validateMovieId, dislikeMovie);

module.exports = routerMovies;
