const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
catchAsync;
const send = (res, status, doc) =>
  res.status(status).json({
    status: 'success',
    doc,
  });

exports.getOne = (modele) => {
  return async (req, res, next) => {
    const doc = await modele.findById(req.params.id);
    if (!doc) return next(new AppError('there is not info with this id'));
    send(res, 200, doc);
  };
};
exports.createOne = (modele) => {
  return async (req, res, next) => {
    const doc = await modele.create(req.body);
    if (!doc) return next(new AppError());
    send(res, 200, doc);
  };
};
exports.deleteOne = (modele) => {
  return async (req, res, next) => {
    const doc = await modele.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('this Id is not valid'));
    send(res, 200, null);
  };
};
exports.getAll = (modele) => {
  return async (req, res, next, filder) => {
    const doc = await modele.find();
    if (doc) return send(res, 200, doc);
    send(res, 404, null);
  };
};
exports.updateOne = (modele) => {
  return async (req, res, next) => {
    const doc = await modele.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });
    if (doc) return send(res, 200, doc);
    send(res, 404, null);
  };
};
