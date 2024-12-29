const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

//midlleware
app.use(cors());
app.use(express.json());

//database;
require("./config/db.config");

//routes
app.use("/api", require("./routes/product.routes"));

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
