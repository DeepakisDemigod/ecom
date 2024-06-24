const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const User = require('../models/userModel.js');
const sendToken = require('../utils/jwttoken.js');
// Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'this is a simple id',
      url: 'profile pic file'
    }
  });
  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if uswr has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler('please enter email & password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  sendToken(user, 200, res);
});
