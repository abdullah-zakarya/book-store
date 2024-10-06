// 1) Import models
const mongoose = require('mongoose');
const vld = require('./../utils/validator');
const Author = require('./authorMudel');
const AppError = require('../utils/AppError');
// 2) Create schema
const bookSchema = new mongoose.Schema(
  {
    name: vld('name').string().require().unique().out,
    price: vld('price').number().require().out,
    author: vld('author').ref('Author').require().out,
    slug: vld('slug')
      .string()
      .default(function () {
        return this.name.split(' ').join('-');
      }).out,
    createAt: vld('createAt').date().default(Date.now).out,
    ratingAvrage: vld('ratingAvrage').number().default(0).out,
    ratingCount: vld('ratingCount').number().default(0).out,
    photo: vld('photo').string().out,
    reviews: [vld('review').ref('Review').out],
    summery: vld('summery').require().string().out,
    description: vld('description').string().require().out,
    count: vld('count').number().default(1).out,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3) Schema methodes
bookSchema.pre('findOne', function (next) {
  this.populate({
    path: 'reviews',
    select: '+content +user -book',
  });
  this.populate({
    path: 'author',
    select: 'name',
  });
  next();
});
bookSchema.pre('save', async function (next) {
  this.slug = this.name.split(' ').join('-');
  const author = await Author.findById(this.author);
  if (!author) return next(new AppError('this author is not exist'));
  author.books.push(this._id);
  author.save();
  next();
});
bookSchema.post('save', function () {});

// 4) Export modele
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
