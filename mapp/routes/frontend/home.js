var express = require('express');
var router = express.Router();
const homeController = require("../../app/controllers/frontend/HomeController")

router.get('/', homeController.show)

module.exports = router;
