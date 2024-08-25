const Book = require('../models/bookMudel');
const catchAsync = require('../utils/catchAsync');
const Sale = require('./../models/saleMudel');
// sales
// last month
exports.lastMonthSale = catchAsync(async (req, res, next) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const stats = await Sale.aggregate([
    {
      $match: {
        createdAt: { $gte: oneMonthAgo },
      },
    },
    {
      $group: {
        _id: '$address.country',
        totalSales: { $sum: '$total' },
        totalTransactions: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    stats,
  });
});
// users
exports.lastMonthTopBooksSale = catchAsync(async (req, res, next) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const stats = await Sale.aggregate([
    {
      $match: {
        createdAt: { $gte: oneMonthAgo },
      },
    },
    {
      $group: {
        _id: '$book',
        totalSales: { $sum: '$total' },
        totalTransactions: { $sum: 1 },
      },
    },
    {
      $sort: { totalSales: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookDetails',
      },
    },
    {
      $unwind: '$bookDetails',
    },
    {
      $project: {
        _id: 0,
        bookName: '$bookDetails.name',
        totalSales: 1,
        totalTransactions: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    stats,
  });
});

// stock
exports.booksOutOfStock = catchAsync(async (req, res, next) => {
  const books = await Book.find({ count: 0 }).select('name author');
  res.status(200).json({
    status: 'success',
    results: books.length,
    books,
  });
});
exports.booksWithFewCopies = catchAsync(async (req, res, next) => {
  const books = await Book.find({ count: { $lte: 5 } }).select(
    'count name author'
  );
  res.status(200).json({
    status: 'success',
    results: books.length,
    books,
  });
});
