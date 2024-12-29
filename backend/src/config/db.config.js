const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on("open", () => {
  console.log("connected to database");
});

db.on("error", (error) => {
  console.log("error connecting to database", error);
});

module.exports = db;
