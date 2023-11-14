const userRouter = require('express').Router();
const {
  createUser, getUser, updateUser, getUsers, updateAvatar,
} = require('../controllers/users');

userRouter.post('/users', createUser);
userRouter.get('/users/:id', getUser);
userRouter.patch('/users/me', updateUser);
userRouter.get('/users', getUsers);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
