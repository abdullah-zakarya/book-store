const express = require('express');
const authController = require('../controller/authController');
const authorController = require('../controller/authorController');

const router = express.Router();

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthor);

router.use(authController.isLogin, authController.restrictTo('admin'));
router.post('/', authorController.createAuthor);
router.patch('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
