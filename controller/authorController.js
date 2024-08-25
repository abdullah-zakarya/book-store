const dataController = require('./dataController');
const catchAsync = require('../utils/catchAsync');
const Author = require('./../models/authorMudel');

exports.createAuthor = catchAsync(dataController.createOne(Author));
exports.getAuthor = catchAsync(dataController.getOne(Author));
exports.deleteAuthor = catchAsync(dataController.deleteOne(Author));
exports.updateAuthor = catchAsync(dataController.updateOne(Author));
exports.getAllAuthors = catchAsync(dataController.getAll(Author));
