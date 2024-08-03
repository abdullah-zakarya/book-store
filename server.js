// 1) Import mudeles
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// Connect to data base
dotenv.config();
const db = process.env.LOCAL_DATABASE;
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// 3) Turn server on
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// System Erorr handle
