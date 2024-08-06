const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// -- the Helper functions -- //
// 1) token creator
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
};

// 2) send token
const sendToken = async (user, statusCode, res) => {
  const token = signToken(user._id);
  const expireDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
  const cookieOptions = {
    expires: expireDate,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// 3) filter object
const filterObj = (obj, ...valides) => {
  const newObj = {};
  for (const el of valides) if (obj[el]) newObj[el] = obj[el];
  return newObj;
};

// 4) sending email
const sendEmail = async (req, user, resetToken) => {
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    console.log(resetURL);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
};

// --signin and login --//
// 1) signup
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    userName: req.body.userName,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email,
  });

  sendToken(newUser, 201, res);
});

// 2) login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('The password and email are required', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('The password or email is wrong', 401));

  sendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// -- check user --//
// 1) is user login
// - 1 token function
const headerToken = (req) => {
  const token = req.headers.authorization?.split(' ');
  return token && token[0] === 'Bearer' ? token[1] : undefined;
};

// - 2 cookie function
const cookieToken = (req) => req.cookies.jwt;

// - 3 main function
exports.isLogin = catchAsync(async (req, res, next) => {
  const token = headerToken(req) || cookieToken(req);
  if (!token) return next(new AppError('You are not logged in', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || !user.active) return next(new AppError('Invalid login', 401));

  req.user = user;
  res.locals.user = user;
  next();
});

// 2) is user can do
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

// -- password methods -- //
// 1) forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('Your email does not exist', 404));

  const newToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  await sendEmail(req, user, newToken);
});

// 2) reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  sendToken(user, 200, res);
});

// -- user methods -- //
// 1) update my password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError('The password is wrong', 401));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  sendToken(user, 200, res);
});

// 2) update me
exports.updateMe = catchAsync(async (req, res, next) => {
  const updateValues = filterObj(req.body, 'name', 'email', 'photo');
  const user = await User.findByIdAndUpdate(req.user.id, updateValues, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// 3) delete me
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
