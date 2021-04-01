const errorController = (err, res) => {
  try {
    if (err.name === 'ValidationError') return err = handValidationError(err, res);
    if (err.code && err.code === 11000) return err = handleDuplicateKeyError(err, res);
  } catch(err) {
    return ({code: err, error: 'An unknow error occured'});
  }
}

const handleDuplicateKeyError = (err, res) => {
  console.log('you hit the duplicate method')
  const field = Object.keys(err.keyValue);
  const code = 409;
  return ({code: code, message: `An account with that ${field} number already exists.`})
}

module.exports = errorController;