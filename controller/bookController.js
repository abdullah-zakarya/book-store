const dataController = require("./dataController");
const Book = require("./../models/bookMudel");
const catchAysnc = require("../utils/catchAysnc");

exports.createBook = catchAysnc(dataController.createOne(Book));
exports.getBook = catchAysnc(dataController.getOne(Book));
exports.deleteBook = catchAysnc(dataController.deleteOne(Book));
exports.updateBook = catchAysnc(dataController.updateOne(Book));
exports.getAllBooks = catchAysnc(dataController.getAll(Book));
