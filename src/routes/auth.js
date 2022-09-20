const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const result = await authController.sigup(req);
    res.status(result.status).json({message: result.message, data: result.data})
});

router.post("/signin", async (req, res) => {
    const result = await authController.singin(req);
    res.status(result.status).json({message: result.message, data: result.data})
});

module.exports = router;
