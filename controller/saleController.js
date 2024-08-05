const dataController = require("./dataController");
const Sale = require("./../models/saleMudel");
const catchAysnc = require("../utils/catchAysnc");

exports.createSale = catchAysnc(dataController.createOne(Sale));
exports.getSale = catchAysnc(dataController.getOne(Sale));
exports.deleteSale = catchAysnc(dataController.deleteOne(Sale));
exports.updateSale = catchAysnc(dataController.updateOne(Sale));
exports.getAllSales = catchAysnc(dataController.getAll(Sale));
