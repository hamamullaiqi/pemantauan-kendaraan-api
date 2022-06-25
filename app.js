require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./src/routers");
const app = express();
const PORT = 5000;

// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome Express");
});

app.listen(PORT, () => {
  console.log(`Server Is running in port ${PORT}`);
});
