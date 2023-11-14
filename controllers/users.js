const User = require('../models/user');
const CODE_STATUSES = require('../utils/constants');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CODE_STATUSES.created).send({ user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(CODE_STATUSES.badRequest).send({
          message: 'Incorrect data',
        });
      }
      return res.status(CODE_STATUSES.internalServerError).send({
        message: 'Server Error',
      });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ user }))
    .catch((error) => {
      if (error.name === null) {
        return res.status(CODE_STATUSES.badRequest).send({
          message: 'Invalid ID',
        });
      }
      if (error.name === 'CastError') {
        return res.status(CODE_STATUSES.badRequest).send({
          message: 'User not found',
        });
      }
      return res.status(CODE_STATUSES.internalServerError).send({
        message: 'Server Error',
      });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.send({ user }))
    .catch((error) => {
      if (error.name === 'NotFound') {
        return res.status(CODE_STATUSES.notFound).send({
          message: 'Invalid ID',
        });
      } if (error.name === 'ValidationError') {
        return res.status(CODE_STATUSES.badRequest).send({
          message: 'Incorrect data',
        });
      }
      return res.status(CODE_STATUSES.internalServerError).send({
        message: 'Server Error',
      });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(CODE_STATUSES.internalServerError).send({
      message: 'Server Error',
    }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.send({ user }))
    .catch((error) => {
      if (error.name === 'NotFound') {
        return res.status(CODE_STATUSES.notFound).send({
          message: 'Invalid ID',
        });
      } if (error.name === 'ValidationError') {
        return res.status(CODE_STATUSES.badRequest).send({
          message: 'Incorrect data',
        });
      }
      return res.status(CODE_STATUSES.internalServerError).send({
        message: 'Server Error',
      });
    });
};

module.exports = {
  createUser, getUser, updateUser, getUsers, updateAvatar,
};
