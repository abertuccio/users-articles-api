const errMsg = require("../errors/errorHandler");

function articleValidation(arrayTags) {
  if (arrayTags.some(t => !/^[a-z]{3,50}$/.test(t))) {
    return errMsg(28);
  }

  return { error: "", valid: true };
}

module.exports = articleValidation;
