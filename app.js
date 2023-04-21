require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { apiLimiter } = require('./middlewares/riteLimited');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const {
  SERVER_ERROR,
  NOT_FOUND_ERROR,
} = require('./middlewares/handelError');

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
app.use(apiLimiter);
app.use(cors());
app.use(requestLogger);
app.use(helmet());

app.use('/', routes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use('*', NOT_FOUND_ERROR);
app.use(SERVER_ERROR);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
