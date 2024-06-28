const ErrorHandler = require('../utils/errorhandler.js');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong mongodb id Error
  if (err.name === 'CastError') {
    const message = `Resource not found, Invalid: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  // duplicate key eror
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 404);
  }

  // wrong jwt token error
  if (err.name === 'JsonWebTokenError') {
    const message = `Json web Token is inValid try again`;
    err = new ErrorHandler(message, 404);
  }
  // wrong jwt token error
  if (err.name === 'TokenExpiredError') {
    const message = `Json web Token is Expired try again`;
    err = new ErrorHandler(message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
