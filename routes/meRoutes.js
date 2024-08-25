const express = require('express');

const bookController = require('./../controller/bookController');
const authController = require('./../controller/authController');
const saleController = require('./../controller/saleController');

// 2) initlize the router
const router = express.Router();

router.use(authController.isLogin);
router.get('/', authController.showMe);
router.post('/buyAllFromMyCart', saleController.buyAllFromCart);
router.delete('/cleanCart', saleController.cleanCart);
router.delete('/cart/:id', saleController.deleteFromCart);

module.exports = router;
