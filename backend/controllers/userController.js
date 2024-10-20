const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const User = require('../models/userModel.js');
const sendToken = require('../utils/jwttoken.js');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.avatar) {
    return next(new ErrorHandler('Please upload an avatar', 400));
  }

  const myCloud = await cloudinary.v2.uploader.upload(
    req.files.avatar.tempFilePath,
    {
      folder: 'avatars',
      width: 150,
      crop: 'scale'
    }
  );

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
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

  const isPasswordMatched = await user.comparePassword(password);

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

  // Get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  {
    /*const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`;*/
  }
  const resetPasswordUrl = `http://localhost:5173/password/reset/${resetToken}`;

  const message = `
    <h1>Password Reset Request</h1>
    <p>Hello ${user.name},</p>
    <p>You have requested to reset your password. Please click the link below to proceed:</p>
    <a href="${resetPasswordUrl}">
      <button style="margin-left: 5px; border-radius: 3px; background-color: royalblue; color: white; padding: 8px 14px; border: none; cursor: pointer;">
        Reset Password
      </button>
    </a>
    <p style="font-size: 9px; opacity: 0.6;">If you did not request this password reset, please ignore this email.</p>
    <p>Thank you,</p>
    <p>The Ecom Team</p>
  `;

  try {
    console.log('Attempting to send email to:', user.email);
    console.log('Email content:', message);

    await sendEmail({
      email: user.email,
      subject: 'Ecom Password Recovery',
      message
    });

    console.log('Email sent successfully');

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`
    });
  } catch (error) {
    console.error('Error sending email:', error);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorHandler(`Email could not be sent. Error: ${error.message}`, 500)
    );
  }
});

// Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating hash token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now()
    }
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'reset password token is invalid or has been expired',
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('passwords doesnot match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

// update user details
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isPasswordMatched = user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('old password is incorrect', 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('password does not match', 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update user profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  };

  // cloudinary

  /*if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(
      req.files.avatar.tempFilePath,
      {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
      }
    );
  }*/

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true
  });
});

// get all users

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  });
});

// get single user (admin)

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user does not exists with id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user
  });
});

// update user role

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };

  // we will add cloudinary later

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true
  });
});

// delete user -- admin
/*
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  
  if (!user) {
    return next(
      new ErrorHandler(`User does not exists with id: ${req.params.id}`, 404)
    );
  }

  const user = await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: `user deleted successfully with id ${req.params.id}`
  });
});
*/

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Validate if id is provided
  if (!id) {
    return next(new ErrorHandler('No user ID provided', 400));
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with id: ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: `User deleted successfully with id ${id}`
  });
});
