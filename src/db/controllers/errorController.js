// Error controller test incoming error then handle it to error handler
const errorController = (err, res) => {
  try {
    if (err.name === 'ValidationError') return err = handValidationError(err, res); // Must test error case
    if (err.code && err.code === 11000) return err = handleDuplicateKeyError(err, res);
  } catch(err) {
    return ({code: err, error: 'An unknown error occurred'});
  }
}

// test is account is duplicate or not
const handleDuplicateKeyError = (err, res) => {
  console.log('you hit the duplicate method')
  const field = Object.keys(err.keyValue);
  const code = 409;
  return ({code: code, message: `An account with that ${field} already exists.`})
}

// Function export
module.exports = errorController;
