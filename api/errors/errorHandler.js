function errorMessaje(code) {
  let defaultError = { error: "Invalid request", valid: false };

  switch (code) {
    case 0:
      defaultError.error = `(${code}) Wrong request format, you are probably sending a broken JSON.`;
      break;
    case 1:
      defaultError.error = `(${code}) You must send a json, and the request header must be using the content-type application/json`;
      break;
    case 2:
    case 9:
    case 15:
    case 16:
    case 27:
      defaultError.error = `(${code}) Invalid request. You are not sending the minimun required parameters. Please review the documentation.`;
      break;
    case 3:
      defaultError.error = `(${code}) Invalid name value. Please review the documentation.`;
      break;
    case 4:
      defaultError.error = `(${code}) Invalid avatar value. Please review the documentation.`;
      break;
    case 5:
      defaultError.error = `(${code}) There is no token sent. Please review the documentation.`;
      break;
    case 6:
      defaultError.error = `(${code}) Invalid Token format.`;
      break;
    case 7:
      defaultError.error = `(${code}) Invalid Token.`;
      break;
    case 8:
      defaultError.error = `(${code}) Invalid endpoint. Please review the documentation.`;
      break;
    case 10:
    case 18:
      defaultError.error = `(${code}) Invalid userId. Please review the documentation.`;
      break;
    case 11:
    case 19:
      defaultError.error = `(${code}) Invalid title. Please review the documentation.`;
      break;
    case 12:
    case 20:
      defaultError.error = `(${code}) Invalid text. Please review the documentation.`;
      break;
    case 21:
    case 13:
    case 28:
      defaultError.error = `(${code}) Invalid tags. Please review the documentation.`;
      break;
    case 14:
    case 22:
      defaultError.error = `(${code}) Invalid user. Please provide a valid user.`;
      break;
    case 17:
    case 25:
      defaultError.error = `(${code}) Invalid articleId. Please review the documentation.`;
      break;
    case 23:
    case 26:
      defaultError.error = `(${code}) This article does not exist. Please review the documentation.`;
      break;
    case 24:
      defaultError.error = `(${code}) This user is not the owner of the article. Please review the documentation.`;
      break;
    default:
      break;
  }

  return defaultError;
}

module.exports = errorMessaje;
