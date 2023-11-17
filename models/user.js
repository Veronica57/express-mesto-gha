const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');
const { urlCheck } = require('../utils/regularexp');

const UnathorizedError = require('../errors/unauthorized');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        massage: 'Некорретный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
      select: false,
    },
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      // required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" -2'],
      maxlength: [30, 'Максимальная длина поля "name" -30'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      // required: [true, 'Поле "about" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "about" -2'],
      maxlength: [30, 'Максимальная длина поля "about" -30'],
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      // required: true,
      validate: {
        validator: (url) => urlCheck.test(url),
        message: 'Введите ссылку',
      },
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnathorizedError('Некорретный email или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnathorizedError('Некорретный email или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
