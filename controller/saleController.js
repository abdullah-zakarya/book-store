const dataController = require('./dataController');
const Sale = require('./../models/saleMudel');
const User = require('./../models/userMudel');

const catchAsync = require('../utils/catchAsync');
const Book = require('../models/bookMudel');
const AppError = require('../utils/AppError');

const buyOne = async (user, book, req) => {
  const total = book.price + (req.body.shippingCharge || 5);
  const sale = await Sale.create({
    user: user._id,
    book: book._id,
    paymentMethod: req.body.paymentMethod,
    shippingCharge: req.body.shippingCharge || 5,
    address: {
      country: req.body.country,
      state: req.body.state,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
    },
    total,
  });

  user.sales.push(sale._id);
  book.count -= 1;
  await book.save({ validateBeforeSave: false });

  return sale;
};

// end user interface
exports.buy = catchAsync(async (req, res, next) => {
  // 1) check if the book exists
  const book = await Book.findOne({ slug: req.params.slug });
  if (!book) return next(new AppError('the book does not exist', 401));
  if (book.count === 0) return next(new AppError('the book is out of stock'));
  const user = await User.findById(req.user._id);
  const sale = await buyOne(user, book, req);
  user.save({ validateBeforeSave: false });
  res.status(201).json({
    status: 'success',
    data: {
      sale,
    },
  });
});

exports.cancel = catchAsync(async (req, res, next) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) return next(new AppError('the operation does not exist', 404));

  const user = await User.findById(req.user._id);
  if (!user._id.equals(sale.customer)) {
    return next(
      new AppError('you do not have the right to delete this sale', 403)
    );
  }

  const book = await Book.findById(sale.book);
  user.sales = user.sales.filter((el) => !el.equals(sale._id));
  book.count += 1;

  await Sale.findByIdAndDelete(sale._id);
  await book.save({ validateBeforeSave: false });
  await user.save({ validateBeforeSave: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug });
  if (!book) return next(new AppError('the book does not exist', 401));
  if (book.count === 0) return next(new AppError('the book is out of stock'));

  const user = await User.findById(req.user._id);
  user.cart.push(book._id);
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ status: 'success' });
});

exports.track = catchAsync(async (req, res, next) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) return next(new AppError('Sale not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      sale,
    },
  });
});

exports.deleteFromCart = catchAsync(async (req, res, next) => {
  const user = await User.getById(req.user._id);
  const index = user.sales.indexOf(req.params.id);
  if (index === -1) return next(new AppError('this sale is not exist'));
  user.sales.splice(index);
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
exports.cleanCart = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.cart = [];
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.buyAllFromCart = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  let total = 0;
  const books = [];

  for (const bookId of user.cart) {
    const book = await Book.findById(bookId);
    if (!book) return next(new AppError('the book does not exist', 401));
    if (book.count === 0) return next(new AppError('the book is out of stock'));

    const sale = await buyOne(user, book, req);
    total += sale.total;
    books.push({
      book: book.name,
      cost: `${book.price} + ${sale.shippingCharge} = ${sale.total}`,
    });
  }

  user.cart = [];
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      books,
      total,
    },
  });
});

// the Admin interface
exports.createSale = catchAsync(dataController.createOne(Sale));
exports.getSale = catchAsync(dataController.getOne(Sale));
exports.deleteSale = catchAsync(dataController.deleteOne(Sale));
exports.updateSale = catchAsync(dataController.updateOne(Sale));
exports.getAllSales = catchAsync(dataController.getAll(Sale));
