const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { RES_OK, RES_CREATED } = require('../utils/GoodRequest');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.status(RES_OK).send(movie.reverse()))
    .catch(next);
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
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(RES_CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new BadRequestError('Произошла ошибка: Данные переданы некорректно'),
        );
        return;
      }
      next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(
          'Произошла ошибка: Фильм c этим id не найден',
        );
      }
      const owner = movie.owner.toHexString();
      if (owner !== req.user._id) {
        throw new ForbiddenError(
          'Произошла ошибка: Этот фильм нельзя удалить',
        );
      }
      return movie.deleteOne();
    })
    .then(() => res.status(RES_OK).send({ message: 'Фильм успешно удален' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError('Произошла ошибка: Фильм c этим id не найден'),
        );
        return;
      }
      next(err);
    });
};

module.exports.likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Произошла ошибка: Фильм c этим id не найден');
      }
      return res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Фильм c этим id не найден'));
        return;
      }
      next(err);
    });
};

module.exports.dislikeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Произошла ошибка: Фильм c этим id не найден');
      }
      res.status(RES_OK).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Фильм c этим id не найден'));
        return;
      }
      next(err);
    });
};
