import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routers.js";
import { checkAuth } from "./middlewares/checkAuth.js";
import authCtrl from "./utils/auth.js";
import { forgotPassword, resfreshAuth } from "./controllers/auth.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

if (process.env.DEV === "true") {
    app.use("/", (req, res, next) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.set(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, HEAD, PATCH, DELETE"
        );
        res.set(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, X-Requested-With, Content-Type,  Accept, Develop-by, bb-token, User-Agent, "
        );
        res.set("Access-Control-Expose-Headers", "*");
        if (req.method.toLowerCase() === "options") {
            res.end("OKE");
        } else {
            next();
        }
    });
}

// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
app.use("/api/v1", checkAuth, router);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Welcome Express");
});

app.use("/auth", authCtrl);

app.listen(PORT, () => {
    console.log(`Server Is running in port ${PORT}`);
});
