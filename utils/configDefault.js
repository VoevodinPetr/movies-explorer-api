const { PORT = 3000 } = process.env;
const { DATABASE_ADRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const SALT_LENGTH = 10;

module.exports = {
  PORT,
  DATABASE_ADRESS,
  SALT_LENGTH,
};
