// 1) Import models
const mongoose = require("mongoose");
const vld = require("./../utils/validator");

// 2) Create schema
const bookSchema = new mongoose.Schema(
  {
    name: vld("name").string().require().unique().out,
    price: vld("price").number().require().out,
    auther: vld("auther").string().require().out,
    slug: vld("slug").string().out,
    createAt: vld("createAt").date().default(Date.now).out,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// 3) Schema methodes

// 4) Export modele
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
