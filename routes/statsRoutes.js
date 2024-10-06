const statsController = require('./../controller/statsController');
const authController = require('./../controller/authController');

const express = require('express');
const router = express.Router();
router.use(authController.isLogin, authController.restrictTo('admin'));
router.get('/lastMonthSaleByCountry', statsController.lastMonthSale);
router.get(
  '/top-10-book-sales-last-month',
  statsController.lastMonthTopBooksSale
);
router.get('/booksOutOfStock', statsController.booksOutOfStock);
router.get('/booksWithFewCopies', statsController.booksWithFewCopies);

module.exports = router;
