const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use("/", (req, res) => {
    res.send("Hello World");
});

mongoose.connect(MONGO_URI)
.then(() => {console.log("Connected to MongoDB")})
.then(() => {app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})})
.catch((err) => {console.log(err);})
