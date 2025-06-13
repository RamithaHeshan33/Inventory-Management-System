const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const indexRoutes = require("./routes/indexRoute");
const paymentRoutes = require("./routes/payment");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentRoutes
);

app.use(express.json());
app.use(cors());
app.use("/", indexRoutes);
app.use("/api/payment", paymentRoutes);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

mongoose.connect(MONGO_URI)
.then(() => {console.log("Connected to MongoDB")})
.then(() => {app.listen(PORT);})
.catch((err) => {console.log(err);})