const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const indexRoutes = require("./routes/indexRoute");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());
app.use("/", indexRoutes);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

mongoose.connect(MONGO_URI)
.then(() => {console.log("Connected to MongoDB")})
.then(() => {app.listen(PORT);})
.catch((err) => {console.log(err);})
