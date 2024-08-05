const dataController = require("./dataController");
const User = require("./../models/userMudel");
const catchAysnc = require("../utils/catchAysnc");

exports.createUser = catchAysnc(dataController.createOne(User));
exports.getUser = catchAysnc(dataController.getOne(User));
exports.deleteUser = catchAysnc(dataController.deleteOne(User));
exports.updateUser = catchAysnc(dataController.updateOne(User));
exports.getAllUsers = catchAysnc(dataController.getAll(User));
