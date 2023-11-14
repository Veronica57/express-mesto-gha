const Card = require('../models/card');
const CODE_STATUSES = require('../utils/constants');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CODE_STATUSES.created).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(CODE_STATUSES.badRequest).send({ message: 'Incorrect data' });
      }
      return res.status(CODE_STATUSES.internalServerError).send({ message: 'Server Error' });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(CODE_STATUSES.internalServerError).send({ message: 'Server Error' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch((error) => {
      if (error.name === null) {
        return res.status(CODE_STATUSES.notFound).send({
          message: 'Invalid ID',
        });
      } if (error.name === 'CastError') {
        return res.status(CODE_STATUSES.badRequest).send({
          message: 'Incorrect data',
        });
      }
      return res.status(CODE_STATUSES.internalServerErrorCODE_STATUSES).send({
        message: 'Server Error',
      });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch((error) => {
      if (error.name === null) {
        return res.status(CODE_STATUSES.notFound).send({
          message: 'Invalid ID',
        });
      } if (error.name === 'CastError') {
        return res.status(CODE_STATUSES.badRequest).send({
          message: 'Incorrect data',
        });
      }
      return res.status(CODE_STATUSES.internalServerError).send({
        message: 'Server Error',
      });
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ card }))
    .catch((error) => {
      if (error.name === null) {
        return res.status(CODE_STATUSES.notFound).send({
          message: 'Invalid ID',
        });
      } if (error.name === 'CastError') {
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
  createCard, getCards, likeCard, dislikeCard, deleteCardById,
};
