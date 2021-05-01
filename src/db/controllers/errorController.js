// Error controller test incoming error then handle it to error handler
errorController = (err, res) => {
  try {
    if (err.name === 'ValidationError') return err = handValidationError(err, res); // Must test error case
    if (err.code && err.code === 11000) return err = handleDuplicateKeyError(err, res);
  } catch(err) {
    return ({code: err, error: 'An unknown error occurred'});
  }
};

// test is account is duplicate or not
handleDuplicateKeyError = (err, res) => {
  console.log('you hit the duplicate method')
  const field = Object.keys(err.keyValue);
  return ({code: 409,success: false, msg: `An account with that ${field} already exists.`})
};

handleValidationError = (err, res) => {
  console.log('You hit a validation error')
  const field = Object.keys(err.keyValue);
  return ({code: 400, success: false, msg: `Validation error, ${field}`});
};

// Function export
module.exports = errorController;
