// 1) Import models
const mongoose = require("mongoose");
const vld = require("./../utils/validator");

// 2) Create Schema
const reviewSchema = new mongoose.Schema({
  userId: vld("userId").ref("User").out,
  bookId: vld("bookId").ref("Book").out,
  content: vld("content").string().require().out,
  rate: vld("rate").number().range(1, 5).out,
  createdAt: vld("createdAt").date().default(Date.now).out,
});

// 3) Schema methodes
reviewSchema.pre(/^find/, function () {
  this.populate({
    path: "userId",
    select: "+name +photo",
  });
  this.populate({
    path: "bookId",
    select: "+name +photo",
  });
});
// 4) export the model
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

(async () => console.log(await Review.find()))();
