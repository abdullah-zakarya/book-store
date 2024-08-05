const saleController = require('../controller/saleController');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(saleController.getAllSales)
  .post(saleController.createSale);

router
  .route('/:id')
  .get(saleController.getSale)
  .patch(saleController.updateSale)
  .delete(saleController.deleteSale);

module.exports = router;
