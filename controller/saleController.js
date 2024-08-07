const dataController = require('./dataController');
const Sale = require('./../models/saleMudel');
const catchAsync = require('../utils/catchAsync');

exports.createSale = catchAsync(dataController.createOne(Sale));
exports.getSale = catchAsync(dataController.getOne(Sale));
exports.deleteSale = catchAsync(dataController.deleteOne(Sale));
exports.updateSale = catchAsync(dataController.updateOne(Sale));
exports.getAllSales = catchAsync(dataController.getAll(Sale));
