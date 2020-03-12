const errMsg = require("../errors/errorHandler");

function articleValidation(params) {
    const tagsParam = ("tags" in params && params.tags ) ? params.tags : '[]';
    const arrayTags = JSON.parse(tagsParam) || [];
    
    if (
        !Array.isArray(arrayTags) ||
        arrayTags.some(t => !/^[a-z]{3,50}$/.test(t))
        ) {
            return errMsg(28);
  }

  return { error: "", valid: true };
}

module.exports = articleValidation;
