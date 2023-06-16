const validator = require('validator');

function validationUrl(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(`${value} is not valid link`);
}

module.exports = { validationUrl };
