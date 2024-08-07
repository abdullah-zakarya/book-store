const dataController = require('./dataController');
const User = require('./../models/userMudel');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(dataController.createOne(User));
exports.getUser = catchAsync(dataController.getOne(User));
exports.deleteUser = catchAsync(dataController.deleteOne(User));
exports.updateUser = catchAsync(dataController.updateOne(User));
exports.getAllUsers = catchAsync(dataController.getAll(User));
