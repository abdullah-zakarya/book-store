// 1) import mudels
const express = require("express");

const bookController = require("./../controller/bookController");
// 2) initlize the router

const router = express.Router();
// 2) Make route
// - 1 Routes for every one
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBook);
// - 2 Routes for admin and writers
router
  .route("/:id", bookController)
  .patch(bookController.updateBook)
  .post(bookController.createBook);
// - 3 Routes for admins
router.route("/:id", bookController).delete(bookController.deleteBook);
// 3) exprot the router

// testing
bookController.getAllBooks();
bookController.getBook();
bookController.createBook();
bookController.deleteBook();
