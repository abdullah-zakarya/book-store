// 1) import mudels
const express = require("express");

const bookController = require("./../controller/bookController");
// 2) initlize the router

const router = express.Router();
// 2) Make route
// - 1 Routes for every one
router.get("/:id", bookController.getBook);
router.get("/", bookController.getAllBooks);

// - 2 Routes for admin and writers
router.post("/", bookController.createBook);
router.route("/:id").patch(bookController.updateBook);
// - 3 Routes for admins
// router.route("/:id", bookController).delete(bookController.deleteBook);
// 3) exprot the router
module.exports = router;

// // testing
