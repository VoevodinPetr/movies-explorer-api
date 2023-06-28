require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { apiLimiter } = require('./middlewares/riteLimited');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const { SERVER_ERROR } = require('./middlewares/handelError');

const { PORT, DATABASE_ADRESS } = require('./utils/configDefault');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_ADRESS)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_ADRESS}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(apiLimiter);
app.use(cors({
  origin: ['http://supermovies1.nomoredomains.monster',
    'https://supermovies1.nomoredomains.monster',
    'http://supermovies.nomoredomains.monster',
    'https://supermovies.nomoredomains.monster',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001'],
  credentials: true,
}));

app.use('/', routes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(SERVER_ERROR);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
