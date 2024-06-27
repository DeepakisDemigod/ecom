const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const User = require('../models/userModel.js');
const sendToken = require('../utils/jwttoken.js');
const sendEmail = require('../utils/sendEmail.js');

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

// login user

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

// Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'logoged out'
  });
});

// forgot password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  console.log(user);

  // get reset pwd token
  const resetToken = user.getResetPasswordToken();

  await user.save({
    validateBeforeSave: false
  });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;
  console.log(resetPasswordUrl)
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then ignore`;
  console.log(message);
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecom Password recovery`,
      message
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({
      validateBeforeSave: false
    });
    return next(new ErrorHandler(error.message, 500));
  }
});
