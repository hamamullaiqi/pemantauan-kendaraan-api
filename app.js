require("dotenv").config();
const express = require("express")
const cors = require("cors");

const router = require("./src/routers");
const app = express()
const PORT = 5000

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);


app.get("/", (req, res) => {
    res.send("Welcome Express")
})

app.listen(PORT, () => {
    console.log(`Server Is running in port ${PORT}`);
})

