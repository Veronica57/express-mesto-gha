require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const error = require('./middlewares/error'); // server error

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(cors);
app.use(requestLogger); // логгер запросов #1
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server is going to crash');
  }, 0);
});
app.use(router); // Обработчики роутов #2
app.use(errorLogger); // логгер ошибок #3
app.use(errors()); // обработчик ошибок celebrate #4

// server error централизованный обработчик ошибок #5
app.use(error);

app.listen(PORT);
