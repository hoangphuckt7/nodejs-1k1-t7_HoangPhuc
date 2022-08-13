const express = require('express');
const router = express.Router();
const authController = require('../../app/controllers/Auth')

router.get("/login", authController.show)

module.exports = router;
