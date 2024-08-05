// 1) Import models
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const vld = require("./../utils/validator");

const conf = function (el) {
  return el === this.password;
};
const mess = "The password and confirm is not the same";

// 2) Create schema
const userSchema = new mongoose.Schema(
  {
    name: vld("name").string().require().out,
    userName: vld("userName").string().require().unique().out,
    email: vld("email").email().out, //
    password: vld("password").string().require().out,
    passwordConfirm: vld("passConf").string().require().vldfunc(conf, mess).out,
    createAt: vld("createAt").date().default(Date.now).out,
    cart: [vld("cart").ref("Book").out],
    seles: [vld("seles").ref("Sele").out],
    active: vld("active").boolean().default(true).unselected().out,
    passwordChangedAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3) Schema methods

// -- crypt password and save it
userSchema.pre("save", async function (next) {
  // - 1 Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  // - 2 Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // - 3 Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// -- update passwordChangeAt
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// -- method to compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// -- method to create password reset token
userSchema.methods.createPasswordResetToken = function () {
  const newToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(newToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return newToken;
};

// 4) Export model
const User = mongoose.model("User", userSchema);
module.exports = User;
