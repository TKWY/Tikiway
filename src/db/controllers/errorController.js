// Error controller test incoming error then handle it to error handler
errorController = (err, res) => {
  const pattern = err.keyPattern;
  const errors = err.errors
  try {
    if (err.name === 'ValidationError') return err = handValidationError(err, res); // Must test error case
    //if (err.code && err.code === 11000) return err = handleDuplicateKeyError(err, res);
    if (pattern.phone) return err = handlePhoneDuplicateError(err, res);
    if (pattern.mail) return err = handleEmailDuplicateError(err, res);
  } catch(err) {
    return ('An unknow error occured.');
  }
};

// test is account is duplicate or not
handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  return (`An account with that ${field} already exists.`)
};

handleValidationError = (err, res) => {
  const field = Object.keys(err.keyValue);
  return ({code: 409, success: false, msg: `Validation error, ${field}`});
};

handlePhoneDuplicateError = (err, res) => {
  res.status(400).json(`The phone number is already in use, please enter another one.`);
};

handleEmailDuplicateError = (err, res) => {
  return ({status: 409, err:'This email address is already in use, please enter another one.'});
};

// Function export
module.exports = errorController;
