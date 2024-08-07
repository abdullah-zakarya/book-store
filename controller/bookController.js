const dataController = require('./dataController');
const Book = require('./../models/bookMudel');
const catchAsync = require('../utils/catchAsync');

exports.createBook = catchAsync(dataController.createOne(Book));
exports.getBook = catchAsync(dataController.getOne(Book));
exports.deleteBook = catchAsync(dataController.deleteOne(Book));
exports.updateBook = catchAsync(dataController.updateOne(Book));
exports.getAllBooks = catchAsync(dataController.getAll(Book));
