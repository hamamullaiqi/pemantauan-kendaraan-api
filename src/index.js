import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routers.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

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
