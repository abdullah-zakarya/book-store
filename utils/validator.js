const mongoose = require("mongoose");
// const validator = require("validator");

class Validate {
  constructor(fieldName) {
    this.fieldName = fieldName;
    this.out = {};
  }

  string() {
    this.out.type = String;
    return this;
  }

  number() {
    this.out.type = Number;
    return this;
  }

  boolean() {
    this.out.type = Boolean;
    return this;
  }

  date() {
    this.out.type = Date;
    return this;
  }

  email() {
    this.out.type = String;
    this.out.required = [true, "Please provide your email"];
    this.out.unique = true;
    this.out.lowercase = true;
    // this.out.validate = [validator.isEmail, "Please provide a valid email"];
    return this;
  }

  require() {
    this.out.required = [true, `${this.fieldName} is required`];
    return this;
  }

  lowerCase() {
    this.out.lowercase = true;
    return this;
  }

  default(func) {
    this.out.default = func;
    return this;
  }

  unique() {
    this.out.unique = [true, `${this.fieldName} must be unique`];
    return this;
  }

  range(start, end) {
    if (start)
      this.out.min = [start, `${this.fieldName} must be minimum ${start}`];
    if (end) this.out.max = [end, `${this.fieldName} must be maximum ${end}`];
    return this;
  }

  enum(...enums) {
    this.out.enum = enums;
    return this;
  }

  ref(ref) {
    this.out.type = mongoose.Schema.Types.ObjectId;
    this.out.ref = ref;
    return this;
  }

  unselected() {
    this.out.select = false;
    return this;
  }

  vldfunc(func, message) {
    this.out.validate = {
      validator: func,
      message,
    };
    return this;
  }
}

module.exports = (fieldName) => new Validate(fieldName);
