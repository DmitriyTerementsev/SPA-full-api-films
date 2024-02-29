const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { RES_OK, RES_CREATED } = require('../utils/GoodRequest');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(RES_CREATED).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Произошла ошибка: Переданы некорректные данные пользователя',
          ),
        );
      }
      if (err.code === 11000) {
        return next(
          new ConflictError(
            'Произошла ошибка: Такой пользователь уже существует',
          ),
        );
      }
      return next(err);
    });
};

module.exports.changeInfo = (req, res, next) => {
  console.log(req.user._id);
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(
          'Произошла ошибка: Пользователь с данным id не найден',
        );
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Произошла ошибка: Переданы некорректные данные пользователя',
          ),
        );
      } else if (err.name === 'CastError') {
        next(
          new BadRequestError(
            'Произошла ошибка: Пользователь с данным id не найден',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwtKey');
  return res.send({ message: 'Вы вышли из аккаунта' });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Произошла ошибка: Пользователь не найден');
    })
    .then((user) => res.status(RES_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError(
            'Произошла ошибка: Переданы некорректные данные пользователя.',
          ),
        );
      }
      return next(err);
    });
};
