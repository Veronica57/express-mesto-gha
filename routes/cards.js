const cardRouter = require('express').Router();
const {
  createCard, getCards, likeCard, dislikeCard, deleteCardById,
} = require('../controllers/cards');

cardRouter.post('/cards', createCard);
cardRouter.get('/cards', getCards);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', dislikeCard);
cardRouter.delete('/cards/:cardId', deleteCardById);

module.exports = cardRouter;
