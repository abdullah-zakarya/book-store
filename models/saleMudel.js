// 1) Import models
const mongoose = require('mongoose');
const vld = require('./../utils/validator');

// 2) Create Schema
const address = new mongoose.Schema({
  country: vld('country').string().require().out,
  state: vld('state').string().require().out,
  street: vld('street').string().require().out,
  houseNumber: vld('houseNumber').string().require().out,
});
const saleSchema = new mongoose.Schema({
  user: vld('user').require().ref('User').out,
  book: vld('book').ref('Book').out,
  shippingCharge: vld('shippingCharge').number().default().out,
  total: vld('total').number().out,
  paymentMethod: vld('paymentMethod')
    .require()
    .enum('Visa', 'MasterCard', 'PayPal')
    .string().out,
  createdAt: vld('createdAt').date().default(Date.now).out,
  address: address,
});

// 3) Schema methodes
// -- populate book and user
saleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '+name +photo',
  });
  this.populate({
    path: 'book',
    select: '+name +price',
  });
  next();
});
// culc total cost

// 4) export the model
const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;
