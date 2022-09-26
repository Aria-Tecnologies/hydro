const express = require("express");
const morgan = require("morgan");
require('dotenv').config();

const cropRoutes = require("./src/routes/crop");
const authRoutes = require("./src/routes/auth");
const farmerRoutes = require("./src/routes/farmer");
const roleRoutes = require("./src/routes/role");

const db = require("./src/database/database");

var bodyParser = require("body-parser");

const PORT = process.env.PORT || "3000";

const app = express();

db.test();
/*
 * Middleware
 */
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


/**
 * Routes
 */
app.use("/auth", authRoutes);
app.use("/crop", cropRoutes);
app.use("/farmer", farmerRoutes);
app.use("/role", roleRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ status: true, message: "All works!!" });
});

/**
 * Start listeninig
 */

app.listen(PORT, () => {
  console.log(`Server liestening on port ${PORT}`);
});