var express = require('express');
var router = express.Router();
const dashboardController = require("../../app/controllers/Dashboard")

router.post("/", dashboardController.show)


module.exports = router;
