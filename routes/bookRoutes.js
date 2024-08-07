// 1) import mudels
const express = require('express');

const bookController = require('./../controller/bookController');
const authController = require('./../controller/authController');
const Book = require('../models/bookMudel');

// 2) initlize the router

const router = express.Router();
// 2) Make route
router
  .route('/')
  .get(authController.isLogin, bookController.getAllBooks)
  .post(
    authController.login,
    authController.restrictTo('admin'),
    bookController.createBook
  );

router.use(authController.login, authController.restrictTo('admin'));

router
  .route('/:id')
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);
// - 3 Routes for admins
// router.route("/:id", bookController).delete(bookController.deleteBook);
// 3) exprot the router
module.exports = router;

// // testing
