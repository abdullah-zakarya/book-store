// 1) import mudels
const express = require('express');

const bookController = require('./../controller/bookController');
const saleConroller = require('./../controller/saleController');
const reviewRoutes = require('./reviewRoutes');
const authController = require('./../controller/authController');

// 2) initlize the router

const router = express.Router();
// 2) Make route
// all books
router.get('/', bookController.getAllBooks);
// one book
router.get('/:slug', bookController.getBookBySlug);
// one book opration
router.use(authController.isLogin);
// sale opration
router.get('/:slug/addToCart', saleConroller.addToCart);
router.post('/:slug/buy', saleConroller.buy);
// review opration
router.use('/:slug/reviews', reviewRoutes);

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router.use(authController.restrictTo('admin'));
router.post('/addQuantity', bookController.addQuantity);
router
  .route('/:id')
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);
// - 3 Routes for admins
// router.route("/:id", bookController).delete(bookController.deleteBook);
// 3) exprot the router
module.exports = router;
