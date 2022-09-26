const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", authController.sigup);

router.post("/signin", authController.singin);

module.exports = router;
