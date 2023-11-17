const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notfound');
const BadRequestError = require('../errors/badrequest');
const ConflictError = require('../errors/conflict');
const UnauthorizedError = require('../errors/unauthorized');

const JWT_SECRET = 'secret-key';
const SALT_ROUND = 10;

// create user
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUND)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('User already exists'));
      } if (err.name === 'ValidationError') {
        return next(new BadRequestError('Incorrect data'));
      }
      return next(err);
    });
};

// user login
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Неправильный email или пароль'));
    });
};

// get user by ID
const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User Not Found');
      }
      return res.status(200).send({ data: user.toObject() });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('User Not Found'));
      } else {
        next(err);
      }
    });
};

// get all users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};

// current user
const currentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User Not Found');
      }
      return res.status(200).send({ data: user.toObject() });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('User Not Found'));
      } else {
        next(err);
      }
    });
};

// update user
const updateUser = (req, res, next) => {
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
        throw new NotFoundError('User Not Found');
      }
      return res.status(200).send({ name: user.name, about: user.about });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data'));
      } else {
        next(err);
      }
    });
};

// update avatar
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Invalid ID');
      }
      return res.status(200).send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, getUser, getUsers, currentUser, updateUser, updateAvatar, login,
};
