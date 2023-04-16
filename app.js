require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { apiLimiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes');
const { handelError } = require('./middlewares/handelError');
const configDefault = require('./utils/configDefault');

const {
  PORT = configDefault.PORT,
  DATABASE_URL = configDefault.DATABASE_URL,
} = process.env;

const app = express();

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.use(apiLimiter);
app.use(cors());
app.use(requestLogger);
app.use(helmet());
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handelError);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}...`);
});
