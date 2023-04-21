const mongoose = require('mongoose');

function validationObjectId(value) {
  const isValid = mongoose.isValidObjectId(value);
  if (isValid) return value;
  throw new Error('ID is not valid');
}

module.exports = { validationObjectId };
