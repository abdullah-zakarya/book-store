// 1) Import models
const mongoose = require('mongoose');
const vld = require('./../utils/validator');

// 2) Create Schema
const reviewSchema = new mongoose.Schema({
  user: vld('user').ref('User').out,
  book: vld('book').ref('Book').out,
  content: vld('content').string().require().out,
  rate: vld('rate').number().range(1, 5).out,
  createdAt: vld('createdAt').date().default(Date.now).out,
});

reviewSchema.index({ user: 1, book: 1 }, { unique: true });
// 3) Schema methodes
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name +photo',
  });
  this.populate({
    path: 'book',
    select: 'name +photo',
  });
  next();
});
// 4) export the model
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
