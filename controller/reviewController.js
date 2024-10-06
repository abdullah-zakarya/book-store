const dataController = require('./dataController');
const Review = require('./../models/reviewMudel');
const catchAsync = require('../utils/catchAsync');
const Book = require('../models/bookMudel');
const AppError = require('../utils/AppError');

exports.createReview = catchAsync(async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug });
  if (!book) return next(new AppError('there is not book'));
  const review = await Review.create({
    content: req.body.content,
    rate: req.body.rate,
    user: req.user._id,
    book: book._id,
  });
  book.ratingAvrage =
    (book.ratingAvrage * book.ratingCount + review.rate) /
    (book.ratingCount + 1);
  book.ratingCount++;
  book.reviews.push(review);
  await book.save();
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});
exports.deleteReview = catchAsync(async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug });
  const review = await Review.findOne({ book: book._id, user: req.user._id });
  if (!review) next(new AppError('you have not review here'));
  book.ratingAvrage =
    (book.ratingAvrage * book.ratingCount - review.rate) /
      (book.ratingCount - 1) || 0;
  book.ratingCount--;
  const index = book.reviews.indexOf(review._id);
  book.reviews.splice(index);
  await book.save();
  await Review.findByIdAndDelete(review._id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
exports.updateReview = catchAsync(async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug });
  const review = await Review.findOne({ book: book._id, user: req.user._id });
  if (!review) next(new AppError('you have not review here'));

  if (req.body.rate) {
    const supRate = req.body.rate - review.rate;
    book.ratingAvrage += supRate / book.ratingCount;
    review.rate = req.body.rate;
  }
  if (req.body.content) review.content = req.body.content;
  await book.save();
  await review.save();
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});
exports.getMyReview = catchAsync(async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug });
  const review = await Review.findOne({ book: book._id, user: req.user._id });
  if (!review) next(new AppError('you have not review here'));
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});
