// 1) Import models
const mongoose = require('mongoose');
const vld = require('./../utils/validator');
const { populate } = require('./reviewMudel');

// 2) Create Schema
const saleSchema = new mongoose.Schema({
  user: vld('user').ref('User').out,
  book: vld('book').ref('Book').out,
  shippingCharge: vld('shippingCharge').number().require().out,
  total: vld('total').number().out,
  createdAt: vld('createdAt').date().default(Date.now).out,
});

// 3) Schema methodes
// -- populate book and user
saleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name +photo',
  });
  this.populate({
    path: 'book',
    select: 'name +price',
  });
  next();
});
// culc total cost
saleSchema.pre('save', function (next) {
  this.total = this.book.price + this.shippingCharge;
  next();
});
// 4) export the model
const Review = mongoose.model('Sale', saleSchema);
module.exports = Review;
