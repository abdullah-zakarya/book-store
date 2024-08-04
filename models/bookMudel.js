// 1) Import models
const mongoose = require("mongoose");
const vld = require("./../utils/validator");

// 2) Create schema
const bookSchema = new mongoose.Schema(
  {
    name: vld("name").string().require().unique().out,
    price: vld("price").number().require().out,
    author: vld("author").string().require().out,
    slug: vld("slug").string().out,
    createAt: vld("createAt").date().default(Date.now).out,
    ratingAvrage: vld("ratingAvrage").number().default(0).out,
    ratingCount: vld("ratingCount").number().default(0).out,
    inStock: vld("inStock").number().range(0, 1000).default(0).out,
    photo: vld("photo").string().out,
    reviews: [vld("review").ref("Review").out],
    summery: vld("summery").require().string().out,
    description: vld("description").string().require().out,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3) Schema methodes
bookSchema.pre("findOne", function () {
  this.populate({
    path: "reviews",
    select: "+content +userId",
  });
});

// 4) Export modele
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
