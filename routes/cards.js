const cardRouter = require('express').Router();
const {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validationCreateCard, validationCardById } = require('../middlewares/validation');

cardRouter.get('/', getCards); // get cards
cardRouter.post('/', validationCreateCard, createCard); // create card
cardRouter.delete('/:cardId', validationCardById, deleteCardById); // delete card
cardRouter.put('/:cardId/likes', validationCardById, likeCard); // add like
cardRouter.delete('/:cardId/likes', validationCardById, dislikeCard); // delete like

module.exports = cardRouter;
