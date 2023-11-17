const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notfound');
const { validationUserBody, validationAuthentification } = require('../middlewares/validation');

router.post('/signup', validationUserBody, createUser);
router.post('/signin', validationAuthentification, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Page Not Found'));
});

module.exports = router;
