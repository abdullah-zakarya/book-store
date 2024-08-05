const dataController = require("./dataController");
const Review = require("./../models/reviewMudel");
const catchAysnc = require("../utils/catchAysnc");

exports.createReview = catchAysnc(dataController.createOne(Review));
exports.getReview = catchAysnc(dataController.getOne(Review));
exports.deleteReview = catchAysnc(dataController.deleteOne(Review));
exports.updateReview = catchAysnc(dataController.updateOne(Review));
exports.getAllReviews = catchAysnc(dataController.getAll(Review));
