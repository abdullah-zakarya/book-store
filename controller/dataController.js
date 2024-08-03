const { runInNewContext } = require("vm");

const send = (res, status, doc) =>
  res.status(status).json({
    status: "success",
    doc,
  });

exports.getOne = (modele) => {
  return async (req, res, next) => {
    const doc = await modele.findById(req.params.id);
    if (doc) return send(res, 200, doc);
    send(res, 404, null);
  };
};

exports.createOne = (modele) => {
  return async (req, res, next) => {
    const doc = await modele.create(req.body);
    if (doc) return send(res, 200, doc);
    send(res, 404, null);
  };
};
exports.deleteOne = (modele) => {
  return async (req, res, next) => {
    const doc = await modele.getByIdAndDelete(req.params.id);
    if (doc) return send(res, 200, doc);
    send(res, 404, null);
  };
};

exports.getAll = (modele) => {
  return async (req, res, next) => {
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
