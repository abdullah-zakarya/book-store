const dataController = require('./dataController');
const Book = require('./../models/bookMudel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getBookBySlug = catchAsync(async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug });
  if (!book) return next(new AppError('this book is not exist'));
  res.status(200).json({
    status: 'success',
    date: {
      book,
    },
  });
});

exports.addQuantity = catchAsync(async (req, res, next) => {
  const fail = [];
  const success = [];
  for (let id of Object.keys(req.body)) {
    const book = await Book.findById(id);
    if (!book) {
      fail.push(id);
      continue;
    }
    book.count += req.body[id];
    await book.save();
    success.push(book);
  }
  const data = {
    successOpration: success.length,
    success,
  };
  if (fail.length) {
    data.failOpration = fail.length;
    data.fail = fail;
    data.message = 'thoes id is not exist ';
  }
  res.status(200).json({ data });
});

exports.createBook = catchAsync(dataController.createOne(Book));
exports.deleteBook = catchAsync(dataController.deleteOne(Book));
exports.updateBook = catchAsync(dataController.updateOne(Book));
exports.getAllBooks = catchAsync(dataController.getAll(Book));
exports.getBook = catchAsync(dataController.getOne(Book));
