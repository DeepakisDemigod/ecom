const ErrorHandler = require('../utils/errorhandler.js');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong mongodb id Error
  if (err.name === 'CastError') {
    const message = `Resource not found, Invalid: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
