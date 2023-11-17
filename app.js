require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');

const router = require('./routes/index');

const error = require('./middlewares/error'); // server error

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(router);

app.use(errors());

// server error
app.use(error);

app.listen(PORT);
