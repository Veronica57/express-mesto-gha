const userRouter = require('express').Router();
const {
  getUser, getUsers, currentUser, updateUser, updateAvatar,
} = require('../controllers/users');
const { validationUpdateUser, validationUpdateAvatar, validationUserId } = require('../middlewares/validation');

userRouter.get('/', getUsers); // users array
userRouter.get('/me', currentUser); // current user
userRouter.get('/:userId', validationUserId, getUser); // get user by ID
userRouter.patch('/me', validationUpdateUser, updateUser); // update user
userRouter.patch('/me/avatar', validationUpdateAvatar, updateAvatar); // update user avatar

module.exports = userRouter;
