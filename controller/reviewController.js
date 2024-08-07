const dataController = require('./dataController');
const Review = require('./../models/reviewMudel');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(dataController.createOne(Review));
exports.getReview = catchAsync(dataController.getOne(Review));
exports.deleteReview = catchAsync(dataController.deleteOne(Review));
exports.updateReview = catchAsync(dataController.updateOne(Review));
exports.getAllReviews = catchAsync(dataController.getAll(Review));
