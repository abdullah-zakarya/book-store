const dataController = require("./dataController");
const Book = require("./../models/bookMudel");

exports.createBook = dataController.createOne(Book);
exports.deleteBook = dataController.deleteOne(Book);
exports.updateBook = dataController.updateOne(Book);
exports.getAllBooks = dataController.getAll(Book);
