const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');
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
    if (!doc) return next(new AppError('cannot ecreate', 403));
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

exports.getAll = (Model) => async (req, res, next) => {
  let filter = {};
  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const docs = await features.query;
  // const docs = await Model.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      docs,
    },
  });
};
