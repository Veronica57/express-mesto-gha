const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/badrequest');
const regExpressions = require('../utils/regularexp');

const UrlValidator = (url) => {
  const urlValidate = regExpressions.urlCheck;
  if (urlValidate.test(url)) {
    return url;
  }
  throw new BadRequestError('Invalid URL');
};

const IdValidator = (id) => {
  const idValidate = regExpressions.idCheck;
  if (idValidate.test(id)) {
    return id;
  }
  throw new BadRequestError('Invalid ID');
};

// create user
module.exports.validationUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(UrlValidator),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// login validation
module.exports.validationAuthentification = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// get user by ID
module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

// update user
module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

// update avatar
module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(UrlValidator),
  }),
});

// create card
module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(UrlValidator),
  }),
});

// update likes for cards
module.exports.validationCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(IdValidator),
  }),
});
