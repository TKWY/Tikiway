/* Main method will return function for each error cases
*  Error handle probably need to populate more function
*  that will be added along the development. */
// Dev&Design
const errorController = (err) => {
  try {
    if (err.name === 'ValidationError') return handleValidationError();
    if (err.name === 'CastError') return handleCastError();
    if (err.code === 11000) return handleDuplicateKeyError();
  } catch(err) {
    if (err) {
      return { status: 500, message: 'Internal Server Error' };
    }
  }
};

// Function handle duplication error and return 409 if data already exist in the database.
handleDuplicateKeyError = () => {
  return { status: 409, message: 'Duplication error'};
};

// Function handle cast error and return 404 if data does not exist in the database.
handleCastError = () => {
  return { status: 404, message: 'Data not found' };
}

// Function handle validation error and return 403 error required form is not valid.
const handleValidationError = () => {
  return { status: 403, message: 'Form validation error'}
};

module.exports = errorController;
