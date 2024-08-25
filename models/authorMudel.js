// 1) Import models
const mongoose = require('mongoose');
const vld = require('../utils/validator');

// 2) Create schema
const authorSchema = new mongoose.Schema(
  {
    name: vld('name').string().require().unique().out,
    slug: vld('slug')
      .string()
      .default(function () {
        return this.name.toLowerCase().split(' ').join('-');
      }).out,
    photo: vld('photo').string().out,
    about: vld('about').string().require().out,
    books: [vld('books').ref('Book').out],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3) Schema methodes
authorSchema.pre('findOne', function (next) {
  this.populate({
    path: 'books',
    select: 'name',
  });
  next();
});

// 4) Export modele
const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
